#!/usr/bin/env python3
import os, json

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
MODULE_DIR = os.path.join(ROOT, 'src', 'data', 'modules')

def load(path):
    with open(path,'r') as f:
        return json.load(f)

def save(path, data):
    with open(path,'w') as f:
        json.dump(data,f,indent=2)

def infer_topic(text):
    t = (text or '').lower()
    if 'field portal' in t or 'sales app' in t or 'ipad' in t: return 'field'
    if 'discontinued' in t: return 'discontinued'
    if 'claim' in t or 'claims portal' in t: return 'claims'
    if 'commission' in t or 'earnings' in t: return 'commission'
    if 'photo report' in t or 'photo sequence' in t: return 'photos'
    if 'adjuster' in t: return 'adjuster'
    if 'shingle' in t: return 'shingle'
    return None

def tune():
    for i in [1,2,3]:
        p = os.path.join(MODULE_DIR, f'module{i}.json')
        if not os.path.isfile(p):
            continue
        d = load(p)
        changed = False
        for sec in d.get('sections', []):
            topic = infer_topic(sec.get('title','') + ' ' + sec.get('content',''))
            for a in sec.get('activities', []) or []:
                if a.get('type') == 'photo-analysis':
                    imgs = a.get('data',{}).get('images',[])
                    if imgs:
                        q = imgs[0].get('questions',[{}])[0]
                        # Update generic prompts
                        if topic == 'claims':
                            q['question'] = 'What is the next step in the claims portal?'
                            q['options'] = ['Upload photo report','Exit without saving','Skip documentation']
                            q['correctAnswer'] = 'Upload photo report'
                        elif topic == 'photos':
                            q['question'] = 'Is this positioned correctly for the photo sequence?'
                            q['options'] = ['Yes, portrait and clear','No, landscape/unclear','Order incorrect']
                            q['correctAnswer'] = 'Yes, portrait and clear'
                        elif topic == 'adjuster':
                            q['question'] = 'What should you confirm with the homeowner?'
                            q['options'] = ['Adjuster date/time','Nothing','Tell them to wait']
                            q['correctAnswer'] = 'Adjuster date/time'
                        elif topic == 'commission':
                            q['question'] = 'Which factor affects commission most here?'
                            q['options'] = ['ACV/RCV and tier','Door color','Weather today']
                            q['correctAnswer'] = 'ACV/RCV and tier'
                        elif topic == 'shingle':
                            q['question'] = 'Which shingle type is this most likely?'
                            q['options'] = ['Architectural','3-tab','Unknown']
                            q['correctAnswer'] = 'Architectural'
                        changed = True
                elif a.get('type') == 'workflow-simulator':
                    steps = a.get('data',{}).get('workflowSteps',[])
                    if topic == 'claims':
                        a['title'] = 'Workflow Simulator - Claims Filing'
                        a['data']['workflowSteps'] = [
                            { 'id': 'login', 'step': 'Login to insurer portal/app', 'correctOrder': 1, 'duration': '30s', 'tips': ['Have policy info ready'] },
                            { 'id': 'submit', 'step': 'Start claim & enter policy details', 'correctOrder': 2, 'duration': '1m', 'tips': ['Verify spelling & numbers'] },
                            { 'id': 'upload', 'step': 'Upload photo report in correct order', 'correctOrder': 3, 'duration': '1m', 'tips': ['Portrait orientation per guide'] },
                            { 'id': 'confirm', 'step': 'Confirm submission & save confirmation #', 'correctOrder': 4, 'duration': '30s', 'tips': ['Note in Field Portal'] },
                        ]
                        changed = True
        if changed:
            save(p, d)
            print('Tuned prompts in', os.path.basename(p))

if __name__ == '__main__':
    tune()

