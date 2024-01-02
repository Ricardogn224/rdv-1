const RdvManager = {
    selectors: {
        get: () => {
            const storedRdvs = JSON.parse(localStorage.getItem('rdvs')) || [];
            return storedRdvs.filter(rdv => rdv.status === 'live');
        },
        count: () => {
            const storedRdvs = JSON.parse(localStorage.getItem('rdvs')) || [];
            return storedRdvs.filter(rdv => rdv.status === 'live').length;
        },
    },
    actions: {
        fetch: () => {
            const storedRdvs = JSON.parse(localStorage.getItem('rdvs')) || [];
            return storedRdvs.filter(rdv => rdv.status === 'live');
        },
        add: (newRdv) => {
            const storedRdvs = JSON.parse(localStorage.getItem('rdvs')) || [];
            const updatedRdvs = [...storedRdvs, newRdv];
            localStorage.setItem('rdvs', JSON.stringify(updatedRdvs));
        },
        delete: (rdvId) => {
            const storedRdvs = JSON.parse(localStorage.getItem('rdvs')) || [];
            const updatedRdvs = storedRdvs.filter(rdv => rdv.id !== rdvId);
            localStorage.setItem('rdvs', JSON.stringify(updatedRdvs));
        },
        edit: (editedRdv) => {
            const storedRdvs = JSON.parse(localStorage.getItem('rdvs')) || [];
            const updatedRdvs = storedRdvs.map(rdv =>
                rdv.id === editedRdv.id ? editedRdv : rdv
            );
            localStorage.setItem('rdvs', JSON.stringify(updatedRdvs));
        },
    },
};

export { RdvManager };
