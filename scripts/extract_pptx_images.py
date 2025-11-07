#!/usr/bin/env python3
import os
import sys
import zipfile
import tempfile
import shutil
import json
import re
from xml.etree import ElementTree as ET


def extract_pptx_images(pptx_path: str, project_root: str):
    if not os.path.isfile(pptx_path):
        raise FileNotFoundError(f"PPTX not found: {pptx_path}")

    public_dir = os.path.join(project_root, 'public', 'assets', 'slides')
    os.makedirs(public_dir, exist_ok=True)

    slide_map = {}  # slide number -> list of destination image paths

    with tempfile.TemporaryDirectory() as tmp:
        with zipfile.ZipFile(pptx_path, 'r') as z:
            z.extractall(tmp)

        slides_dir = os.path.join(tmp, 'ppt', 'slides')
        rels_dir = os.path.join(slides_dir, '_rels')
        media_dir = os.path.join(tmp, 'ppt', 'media')

        if not os.path.isdir(slides_dir) or not os.path.isdir(media_dir):
            raise RuntimeError('Unexpected PPTX structure; missing ppt/slides or ppt/media')

        # Build mapping slideN -> referenced media filenames
        for name in os.listdir(slides_dir):
            if not name.startswith('slide') or not name.endswith('.xml'):
                continue
            m = re.match(r'slide(\d+)\.xml$', name)
            if not m:
                continue
            slide_num = int(m.group(1))
            rels_path = os.path.join(rels_dir, f'slide{slide_num}.xml.rels')
            media_files = []
            if os.path.isfile(rels_path):
                try:
                    tree = ET.parse(rels_path)
                    root = tree.getroot()
                    # Relationship Target may be like '../media/image1.png' or 'media/image1.png'
                    for rel in root.findall('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
                        target = rel.attrib.get('Target', '')
                        if 'media/' in target and ('image' in target or target.lower().endswith(('.png','.jpg','.jpeg'))):
                            media_name = os.path.basename(target)
                            media_files.append(media_name)
                except Exception:
                    pass
            # De-dup
            media_files = list(dict.fromkeys(media_files))

            dest_paths = []
            for mfile in media_files:
                src_path = os.path.join(media_dir, mfile)
                if not os.path.isfile(src_path):
                    continue
                dest_name = f'slide-{slide_num}-{mfile}'
                dest_path = os.path.join(public_dir, dest_name)
                shutil.copy2(src_path, dest_path)
                web_path = f'/assets/slides/{dest_name}'
                dest_paths.append(web_path)
            if dest_paths:
                slide_map[str(slide_num)] = dest_paths

    # Write slideImages.json for reference
    slide_json_path = os.path.join(project_root, 'src', 'data', 'media', 'slideImages.json')
    os.makedirs(os.path.dirname(slide_json_path), exist_ok=True)
    with open(slide_json_path, 'w') as f:
        json.dump({ 'slides': slide_map }, f, indent=2)

    # Optionally update topicPhotos.json with known topic->slide mapping
    topic_path = os.path.join(project_root, 'src', 'data', 'media', 'topicPhotos.json')
    if os.path.isfile(topic_path):
        with open(topic_path, 'r') as f:
            topic = json.load(f)
        topics = { t['key']: t for t in topic.get('topics', []) }

        def assign_slide_images(key: str, slide_numbers):
            t = topics.get(key)
            if not t:
                return
            imgs = []
            for sn in slide_numbers:
                arr = slide_map.get(str(sn), [])
                # take up to first 2 images per slide
                imgs.extend(arr[:2])
            if imgs:
                t['images'] = imgs

        # Default mapping (adjust as needed)
        assign_slide_images('field portal app', [10, 11])
        assign_slide_images('discontinued shingles', [16])

        with open(topic_path, 'w') as f:
            json.dump(topic, f, indent=2)

    return slide_map


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('Usage: extract_pptx_images.py \\')
        print('  \\')
        sys.exit(1)
    pptx = sys.argv[1]
    root = sys.argv[2]
    m = extract_pptx_images(pptx, root)
    print(f'Extracted slides: {len(m)}')

