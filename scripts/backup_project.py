# scripts/backup_project.py

import os
import shutil
from datetime import datetime

# 1️⃣ Chemin du projet (dossier parent du script)
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

# 2️⃣ Chemin du dossier parent (où seront créées les backups)
parent_dir = os.path.abspath(os.path.join(project_root, '..'))

# 3️⃣ Créer un nom de dossier de backup avec timestamp
timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
backup_dir_name = f'keyboard_1_octave_backup_{timestamp}'
backup_dir = os.path.join(parent_dir, backup_dir_name)

# 4️⃣ Copier le projet
try:
    shutil.copytree(
        project_root, 
        backup_dir, 
        dirs_exist_ok=True, 
        ignore=shutil.ignore_patterns('backup_*', '__pycache__', 'node_modules', 'dist')
    )
    print(f"✅ Sauvegarde réussie dans : {backup_dir}")
except Exception as e:
    print(f"❌ Erreur lors de la sauvegarde : {e}")

# 5️⃣ Limiter le nombre de sauvegardes à 5
def cleanup_old_backups(parent_dir, prefix='keyboard_1_octave_backup_', max_backups=5):
    backups = [d for d in os.listdir(parent_dir) if d.startswith(prefix) and os.path.isdir(os.path.join(parent_dir, d))]
    backups.sort()  # du plus ancien au plus récent
    while len(backups) > max_backups:
        oldest = backups.pop(0)
        path_to_remove = os.path.join(parent_dir, oldest)
        try:
            shutil.rmtree(path_to_remove)
            print(f"🗑 Suppression ancienne sauvegarde : {path_to_remove}")
        except Exception as e:
            print(f"❌ Impossible de supprimer {path_to_remove} : {e}")

cleanup_old_backups(parent_dir)