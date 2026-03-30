#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="/home/mike/Documents/projects/wrath/code"
PLAN_DIR="$ROOT_DIR/work/rac-css-structure/plan02"
PLAN_REVIEW_DIR="$PLAN_DIR/20-plan-review"
STATE_DIR="/tmp/wrath-plan02-feedback-poller"
SEEN_FILE="$STATE_DIR/seen.txt"
COUNT_FILE="$STATE_DIR/update-count.txt"
LOG_FILE="$STATE_DIR/poller.log"
INIT_FILE="$STATE_DIR/initialized"
TARGET_FILE="$PLAN_DIR/plan.md"
UNSURE_FILE="$PLAN_REVIEW_DIR/unsure.md"

mkdir -p "$STATE_DIR"
touch "$SEEN_FILE" "$LOG_FILE"

if [[ ! -f "$COUNT_FILE" ]]; then
    printf '0\n' >"$COUNT_FILE"
fi

timestamp() {
    date '+%Y-%m-%d %H:%M:%S'
}

log() {
    printf '[%s] %s\n' "$(timestamp)" "$*" >>"$LOG_FILE"
}

seed_seen_files() {
    if [[ -f "$INIT_FILE" ]]; then
        return
    fi

    printf '%s\n' "$PLAN_REVIEW_DIR/feedback01.md" >>"$SEEN_FILE"
    printf '%s\n' "$PLAN_REVIEW_DIR/feedback02.md" >>"$SEEN_FILE"
    sort -u "$SEEN_FILE" -o "$SEEN_FILE"
    touch "$INIT_FILE"
    log "Seeded previously processed feedback files as already seen."
}

plan_checksum() {
    sha256sum "$TARGET_FILE" | awk '{print $1}'
}

process_feedback_file() {
    local feedback_file="$1"
    local before after count prompt output_file

    before="$(plan_checksum)"
    output_file="$STATE_DIR/last-message.txt"

    prompt=$(cat <<EOF
Read \`$feedback_file\` and \`work/rac-css-structure/plan02/plan.md\`.

Task:
- Consider each suggestion in the feedback file carefully.
- For suggestions you agree with, update only \`work/rac-css-structure/plan02/plan.md\`.
- For suggestions you do not agree with, or are unsure about, append them to \`work/rac-css-structure/plan02/20-plan-review/unsure.md\`.
- In \`20-plan-review/unsure.md\`, include the feedback filename, the suggestion, and a short explanation of why you disagreed or were unsure.
- Do not modify any other files.
- If you modify either file, run \`npm run format\` and \`npm run lint\`.
- Assume feedback files do not change after they are written.
- Keep existing decisions unless the new feedback gives a stronger argument.

Important:
- Count this run as a plan update only if \`plan.md\` actually changes.
- Do not update other research notes or inventories to keep them in sync; this watcher owns only \`work/rac-css-structure/plan02/plan.md\` and \`work/rac-css-structure/plan02/20-plan-review/unsure.md\`.

In your final response, state whether \`plan.md\` changed.
EOF
)

    if ! codex -a never exec --sandbox workspace-write --ephemeral -C "$ROOT_DIR" -o "$output_file" "$prompt" >>"$LOG_FILE" 2>&1; then
        log "Processing failed for $feedback_file"
        return 1
    fi

    after="$(plan_checksum)"
    if [[ "$before" != "$after" ]]; then
        count="$(cat "$COUNT_FILE")"
        count="$((count + 1))"
        printf '%s\n' "$count" >"$COUNT_FILE"
        log "Updated plan.md from $feedback_file. Completed update sets: $count/25"
    else
        log "No plan.md changes from $feedback_file"
    fi

    printf '%s\n' "$feedback_file" >>"$SEEN_FILE"
    sort -u "$SEEN_FILE" -o "$SEEN_FILE"
}

seed_seen_files
log "Starting poller. Watching $PLAN_REVIEW_DIR for new feedback*.md files."

while true; do
    count="$(cat "$COUNT_FILE")"
    if (( count >= 25 )); then
        log "Reached 25 plan.md update sets. Polling complete."
        exit 0
    fi

    while IFS= read -r feedback_file; do
        [[ -z "$feedback_file" ]] && continue

        if grep -Fxq "$feedback_file" "$SEEN_FILE"; then
            continue
        fi

        log "Found new feedback file: $feedback_file"
        process_feedback_file "$feedback_file" || true
    done < <(find "$PLAN_REVIEW_DIR" -maxdepth 1 -type f -name 'feedback*.md' -print | sort)

    sleep 60
done
