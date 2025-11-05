#!/bin/bash
cd /home/kavia/workspace/code-generation/historical-event-guessing-game-183366-183376/historical_event_trivia_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

