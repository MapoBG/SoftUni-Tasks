window.game = (function () {
    return {
        events: {
            onBeginTurn: createObserver(),
            onEncounterEnd: createObserver(),
        },
    };

    function createObserver() {
        const listeners = new Set;
        trigger.subscribe = subscribe;
        trigger.unsubscribe = unsubscribe;

        return trigger;

        function trigger(...params) {
            listeners.forEach(l => l(...params));
        }

        function subscribe(listener) {
            listeners.add(listener);
        }

        function unsubscribe(listener) {
            listeners.delete(listener);
        }
    }
})();