// firebase-core.js
window.initializeFirebase = function(config, pageKey) {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    const db = firebase.database();

    function loadCheckboxStates() {
        db.ref('checkboxStates/' + pageKey).once('value').then(snapshot => {
            const data = snapshot.val() || {};
            document.querySelectorAll('.state-checkbox').forEach(cb => {
                cb.checked = !!data[cb.dataset.id];
            });
        });
    }

    function saveCheckboxState(id, checked) {
        db.ref(`checkboxStates/${pageKey}/${id}`).set(checked);
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadCheckboxStates();

        document.querySelectorAll('.state-checkbox').forEach(cb => {
        cb.addEventListener('change', () => {
            saveCheckboxState(cb.dataset.id, cb.checked);
        });
        });
    });
};
