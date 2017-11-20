npm #/bin/sh
PREFIX=entrypoint
ENTRYPOINT__D=/entrypoint.d
parts=$ENTRYPOINT__D/*
partCount=${#parts}

echo "${ENTRYPOINT}.start"

if [[ $partCount -gt 0 ]]; then
	echo "${ENTRYPOINT}.parts.start"
	run-parts $ENTRYPOINT__D
	echo "${ENTRYPOINT}.parts.end"
fi

echo "${ENTRYPOINT}.preExec"
echo "${ENTRYPOINT}.exec ${@}"

exec "$@"

echo "${ENTRYPOINT}.postExec"
