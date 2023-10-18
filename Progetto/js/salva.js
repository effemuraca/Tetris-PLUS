const popupSalva = document.getElementById('salvataggio_popup');
popupSalva.addEventListener('click', function () {
    let valoreSalvataggio = document.getElementById('tipo_salvataggio').value;
    let tipoSalvataggio;
    if (valoreSalvataggio === '0')
        tipoSalvataggio = 'privato';
    else
        tipoSalvataggio = 'pubblico';
    if (nGiocatori === 2) {
        const qualeSalvare  = document.getElementById('partita_da_salvare').value;
        if (qualeSalvare === '0') {
            partitaG1.salvaPartita(tipoSalvataggio);
        } else {
            partitaG2.salvaPartita(tipoSalvataggio);
        }
    }
    else {
        partitaG1.salvaPartita(tipoSalvataggio);
    }


});