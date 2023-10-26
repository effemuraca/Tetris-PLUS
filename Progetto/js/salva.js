const bottoneSalva = document.getElementById('salvataggio_popup');
bottoneSalva.addEventListener('submit', function (event) {
    event.preventDefault();

    const tipoSalvataggio = document.getElementById('tipo_salvataggio').value;
    let valoreSalvataggio;
    if (tipoSalvataggio === 'privato')
        valoreSalvataggio = 0;
    else
        valoreSalvataggio = 1;
    if (nGiocatori === '2') {
        const qualeSalvare = document.getElementById('partita_da_salvare').value;
        if (qualeSalvare === 'partita1') {
            partitaG1.salvaPartita(valoreSalvataggio);
        }
        else if (qualeSalvare === 'partita2') {
            partitaG2.salvaPartita(valoreSalvataggio);
        }
        else {
            partitaG1.salvaPartita(valoreSalvataggio, partitaG2);
        }
    }
    else {
        partitaG1.salvaPartita(valoreSalvataggio);
    }


});