#!/bin/bash
cd /home/kavia/workspace/code-generation/content-hub-4186-4197/blog_backend_api
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

