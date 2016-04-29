$(function() {

    console.log("ChemDoodleWeb");

    getChemVersion();

    showMolecule(new ChemDoodle.structures.Molecule());

    // a nice overview of the Molecule data structure.
    var mol = new ChemDoodle.structures.Molecule();
    var carbon = new ChemDoodle.structures.Atom('C');
    var oxygen = new ChemDoodle.structures.Atom('O');
    var bond = new ChemDoodle.structures.Bond(carbon, oxygen, 1);
    mol.atoms[0] = carbon;
    mol.atoms[1] = oxygen;
    mol.bonds[0] = bond;
    showMolecule(mol);

    // pyridineMolFile, first way.
    var pyridineMolFile = 'Molecule Name\n  CHEMDOOD01011121543D 0   0.00000     0.00000     0\n[Insert Comment Here]\n  6  6  0  0  0  0  0  0  0  0  1 V2000\n    0.0000    1.0000    0.0000   N 0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660    0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n   -0.8660   -0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.0000   -1.0000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660   -0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n    0.8660    0.5000    0.0000   C 0  0  0  0  0  0  0  0  0  0  0  0\n  1  2  2  0  0  0  0\n  2  3  1  0  0  0  0\n  3  4  2  0  0  0  0\n  4  5  1  0  0  0  0\n  5  6  2  0  0  0  0\n  6  1  1  0  0  0  0\nM  END';
    var mol = ChemDoodle.readMOL(pyridineMolFile);
    showMolecule(mol);

    ChemDoodle.io.file.content('./data/benzene.mol', function(fileContent) {
        console.log("callback, ChemDoodle.io.file-->");
        var mol = ChemDoodle.readMOL(fileContent);
        showMolecule(mol);
    });

    // TODO, 未获得/设置 许可证.
    //  console.error("iChemLabs.getMoleculeFromDatabase, 未获得/设置 许可证.");
    //  ChemDoodle.iChemLabs.getMoleculeFromDatabase('morphine', {
    //      'database': 'pubchem'
    //  }, function(mol) {
    //      console.log("getMoleculeFromDatabase-->");
    //      showMolecule(mol);
    //  });

    // viewACS_1
    var viewACS = new ChemDoodle.ViewerCanvas('viewACS_1', 100, 100);
    viewACS.specs.bonds_width_2D = .6;
    viewACS.specs.bonds_saturationWidth_2D = .18;
    viewACS.specs.bonds_hashSpacing_2D = 2.5;
    viewACS.specs.atoms_font_size_2D = 10;
    viewACS.specs.atoms_font_families_2D = ['Helvetica', 'Arial', 'sans-serif'];
    viewACS.specs.atoms_displayTerminalCarbonLabels_2D = true;

    ChemDoodle.io.file.content('./data/benzene.mol', function(fileContent) {
        var mol = ChemDoodle.readMOL(fileContent);
        mol.scaleToAverageBondLength(14.4);
        viewACS.loadMolecule(mol);
    });

    // transformCanvas_1
    var transform = new ChemDoodle.TransformCanvas('transformCanvas_1', 350, 200, true);
    transform.specs.bonds_useJMOLColors = true;
    transform.specs.bonds_width_2D = 3;
    transform.specs.atoms_display = false;
    transform.specs.backgroundColor = 'black';
    transform.specs.bonds_clearOverlaps_2D = true;

    ChemDoodle.io.file.content('./data/benzene.mol', function(fileContent) {
        var mol = ChemDoodle.readMOL(fileContent);
        mol.scaleToAverageBondLength(14.4);
        transform.loadMolecule(mol);
    });





    function getChemVersion() {
        var msg = 'The version of ChemDoodle installed is: ' + ChemDoodle.getVersion();
        console.log("msg:" + msg);
    };

    function showMolecule(mol) {
        // atoms, bonds, rings;

        var moleculeMsg = 'This molecule contains ' + mol.atoms.length +
            ' atoms and ' + mol.bonds.length + ' bonds.';
        console.log("moleculeMsg:" + moleculeMsg);
    }


});