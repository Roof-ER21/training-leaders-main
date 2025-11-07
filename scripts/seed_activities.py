#!/usr/bin/env python3
import os
import json
import re
from copy import deepcopy

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
MODULE_DIR = os.path.join(PROJECT_ROOT, 'src', 'data', 'modules')
TOPIC_PATH = os.path.join(PROJECT_ROOT, 'src', 'data', 'media', 'topicPhotos.json')
SLIDE_PATH = os.path.join(PROJECT_ROOT, 'src', 'data', 'media', 'slideImages.json')


def load_json(p):
    with open(p, 'r') as f:
        return json.load(f)


def save_json(p, data):
    with open(p, 'w') as f:
        json.dump(data, f, indent=2)


def infer_topic(section_text):
    t = section_text.lower()
    def m(s):
        return s in t
    if m('field portal') or m('sales app') or m('ipad'):
        return 'field portal app'
    if m('discontinued shingle') or m('discontinued'):
        return 'discontinued shingles'
    if m('claim') or m('claims portal') or m('insurance app') or m('file claim'):
        return 'claims filing portal'
    if m('commission') or m('earnings'):
        return 'commission structure'
    if m('photo report') or m('photo sequence') or m('photo order'):
        return 'photo report'
    if m('shingle types') or m('shingles types') or m('asphalt shingle'):
        return 'shingles types'
    if m('adjuster scheduling') or m('adjuster meeting') or m('schedule adjuster'):
        return 'adjuster scheduling'
    if m('abbreviations') or m('acronyms'):
        return 'common abbreviations'
    return None


def pick_topic_images(topic_map, key, n=2):
    for t in topic_map.get('topics', []):
        if t.get('key') == key:
            imgs = t.get('images', [])
            return imgs[:n]
    return []


def pick_any_slides(slides, n=2):
    all_imgs = []
    for v in slides.get('slides', {}).values():
        all_imgs.extend(v)
    return all_imgs[:n]


def ensure_seeded(section, topic_map, slides):
    activities = section.get('activities', [])
    # Only top up if fewer than 3
    if len(activities) >= 3:
        return section

    # Add one workflow simulator if absent (topic-tailored when possible)
    if not any(a.get('type') == 'workflow-simulator' for a in activities):
        topic_key = infer_topic(text)
        wf_steps = [
            { 'id': 'prep', 'step': 'Prepare resources', 'correctOrder': 1, 'duration': '30s', 'tips': ['Review checklist'] },
            { 'id': 'execute', 'step': 'Execute core step', 'correctOrder': 2, 'duration': '1-2m', 'tips': ['Follow best practices'] },
            { 'id': 'document', 'step': 'Document & upload', 'correctOrder': 3, 'duration': '1m', 'tips': ['Ensure accuracy before upload'] },
        ]
        if topic_key == 'claims filing portal':
            wf_steps = [
                { 'id': 'login', 'step': 'Login to insurer portal/app', 'correctOrder': 1, 'duration': '30s', 'tips': ['Have policy info ready'] },
                { 'id': 'submit', 'step': 'Start claim & enter policy details', 'correctOrder': 2, 'duration': '1m', 'tips': ['Verify spelling & numbers'] },
                { 'id': 'upload', 'step': 'Upload photo report in correct order', 'correctOrder': 3, 'duration': '1m', 'tips': ['Portrait orientation per guide'] },
                { 'id': 'confirm', 'step': 'Confirm submission & save confirmation #', 'correctOrder': 4, 'duration': '30s', 'tips': ['Note in Field Portal'] },
            ]
        elif topic_key == 'photo report':
            wf_steps = [
                { 'id': 'sequence', 'step': 'Capture photos in required sequence', 'correctOrder': 1, 'duration': '2m', 'tips': ['Follow mailbox→house→elevations→roof'] },
                { 'id': 'check', 'step': 'Quality check (portrait, clarity, coverage)', 'correctOrder': 2, 'duration': '45s', 'tips': ['Retake unclear shots'] },
                { 'id': 'upload', 'step': 'Upload to Field Portal', 'correctOrder': 3, 'duration': '45s', 'tips': ['Verify upload completed'] },
            ]
        elif topic_key == 'adjuster scheduling':
            wf_steps = [
                { 'id': 'call', 'step': 'Contact homeowner to collect availability', 'correctOrder': 1, 'duration': '30s', 'tips': ['Offer two time windows'] },
                { 'id': 'coordinate', 'step': 'Coordinate with adjuster within 24–48h', 'correctOrder': 2, 'duration': '1m', 'tips': ['Share documentation link'] },
                { 'id': 'confirm', 'step': 'Confirm date/time & doc prep with homeowner', 'correctOrder': 3, 'duration': '30s', 'tips': ['Set reminders'] },
            ]
        elif topic_key == 'commission structure':
            wf_steps = [
                { 'id': 'calc', 'step': 'Calculate ACV & commission tier', 'correctOrder': 1, 'duration': '1m', 'tips': ['Confirm deductible & fees'] },
                { 'id': 'explain', 'step': 'Explain earnings transparently to rep', 'correctOrder': 2, 'duration': '45s', 'tips': ['Use examples from training'] },
                { 'id': 'plan', 'step': 'Set goals to reach next tier', 'correctOrder': 3, 'duration': '30s', 'tips': ['Focus on pipeline velocity'] },
            ]
        elif topic_key == 'shingles types':
            wf_steps = [
                { 'id': 'identify', 'step': 'Identify shingle type/brand/style', 'correctOrder': 1, 'duration': '45s', 'tips': ['Use slide reference'] },
                { 'id': 'assess', 'step': 'Assess for damage (hail/wind indicators)', 'correctOrder': 2, 'duration': '1m', 'tips': ['Granule loss/creases/missing tabs'] },
                { 'id': 'doc', 'step': 'Document with clear photos & notes', 'correctOrder': 3, 'duration': '45s', 'tips': ['Portrait orientation'] },
            ]
        elif topic_key == 'common abbreviations':
            wf_steps = [
                { 'id': 'learn', 'step': 'Review common acronyms & meanings', 'correctOrder': 1, 'duration': '45s', 'tips': ['Slide references'] },
                { 'id': 'apply', 'step': 'Apply correct terms in notes & docs', 'correctOrder': 2, 'duration': '45s', 'tips': ['Consistency matters'] },
                { 'id': 'audit', 'step': 'Audit job entries for clarity', 'correctOrder': 3, 'duration': '45s', 'tips': ['Replace ambiguous terms'] },
            ]
        wf = {
            'id': f"{section.get('id','sec')}-auto-workflow",
            'title': 'Workflow Simulator - ' + section.get('title', 'Section'),
            'description': 'Practice the correct sequence of actions based on this section.',
            'type': 'workflow-simulator',
            'points': 15,
            'data': {
                'scenario': f"Apply the concepts from \"{section.get('title','Section')}\" in the correct order.",
                'timeLimit': 240,
                'workflowSteps': wf_steps,
                'scenarioDetails': (section.get('content') or '')[:200]
            }
        }
        activities.append(wf)

    # Build 1–2 photo-analysis using topic images or fallback
    text = (section.get('title','') + ' ' + section.get('content',''))
    topic_key = infer_topic(text)
    imgs = pick_topic_images(topic_map, topic_key, 2) if topic_key else []
    if not imgs:
        imgs = pick_any_slides(slides, 2)
    # Topic-specific prompt for photo analysis
    prompt = 'What does this indicate?'
    options = ['Proceed with documentation','No action needed','Cancel inspection']
    if topic_key == 'claims filing portal':
        prompt = 'What is the next step in the claims portal?'
        options = ['Upload photo report','Exit without saving','Skip documentation']
    elif topic_key == 'photo report':
        prompt = 'Is this positioned correctly for the photo sequence?'
        options = ['Yes, portrait and clear','No, landscape/unclear','Order incorrect']
    elif topic_key == 'adjuster scheduling':
        prompt = 'What should you confirm with the homeowner?'
        options = ['Adjuster date/time','Nothing','Tell them to wait']
    elif topic_key == 'commission structure':
        prompt = 'Which factor affects commission most here?'
        options = ['ACV/RCV and tier','Door color','Weather today']
    elif topic_key == 'shingles types':
        prompt = 'Which shingle type is this most likely?'
        options = ['Architectural','3-tab','Unknown']
    elif topic_key == 'common abbreviations':
        prompt = 'What does this acronym most likely stand for?'
        options = ['Accurate expansion','No expansion needed','Ignore acronym']

    pa1 = {
        'id': f"{section.get('id','sec')}-photo-analysis-1",
        'title': 'Photo Analysis - ' + (topic_key or 'Training Slide'),
        'description': 'Identify what these images indicate and choose the best next action.',
        'type': 'photo-analysis',
        'points': 10,
        'data': {
            'images': [
                {
                    'id': f"{section.get('id','sec')}-img-1",
                    'imageUrl': imgs[0] if imgs else '',
                    'description': 'Training slide reference',
                    'questions': [
                        {
                            'question': prompt,
                            'correctAnswer': options[0],
                            'options': options
                        }
                    ]
                }
            ]
        }
    }
    if len(activities) < 3:
        activities.append(pa1)
    if len(activities) < 3:
        imgs2 = pick_topic_images(topic_map, topic_key, 2) if topic_key else pick_any_slides(slides, 2)
        pa2 = deepcopy(pa1)
        pa2['id'] = f"{section.get('id','sec')}-photo-analysis-2"
        if imgs2:
            pa2['data']['images'][0]['imageUrl'] = imgs2[min(1, len(imgs2)-1)]
        activities.append(pa2)

    section['activities'] = activities
    return section


def main():
    topic_map = load_json(TOPIC_PATH)
    slides = load_json(SLIDE_PATH)
    for m in range(4, 10):
        path = os.path.join(MODULE_DIR, f'module{m}.json')
        if not os.path.isfile(path):
            continue
        data = load_json(path)
        sections = data.get('sections', [])
        new_sections = []
        for sec in sections:
            new_sections.append(ensure_seeded(sec, topic_map, slides))
        data['sections'] = new_sections
        save_json(path, data)
        print(f"Seeded activities for module{m}.json")


if __name__ == '__main__':
    main()
