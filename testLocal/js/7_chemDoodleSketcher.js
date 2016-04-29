

//    setSketcher_1();
//    setSketcher_2();


var PAGE = {};

$(function(){
    
    $("#check_btn").on("click", function(){
        
        var mol = PAGE.sketcher.getMolecule();
        var dummy = new ChemDoodle.io.JSONInterpreter().molTo(mol);
        var asString = JSON.stringify(dummy);
        var asObj = JSON.parse(asString);
        
        var moljs = JSON.stringify(mol)
        // console.log("mol:" + JSON.stringify(mol));
        
        console.log("asString:" + asString);
    });
    
})


function setSketcher_1() {
    // changes the default JMol color of hydrogen to black so it appears on white backgrounds
    ChemDoodle.ELEMENT['H'].jmolColor = 'black';
    // darkens the default JMol color of sulfur so it appears on white backgrounds
    ChemDoodle.ELEMENT['S'].jmolColor = '#B9A130';
    // initializes the SketcherCanvas
    var sketcher = new ChemDoodle.SketcherCanvas('sketcher_1', 500, 300, {
        useServices: false, // true, false
        oneMolecule: false,
        includeToolbar: true
    });
    // sets terminal carbon labels to display
    sketcher.specs.atoms_displayTerminalCarbonLabels_2D = true;
    // sets atom labels to be colored by JMol colors, which are easy to recognize
    sketcher.specs.atoms_useJMOLColors = true;
    // enables overlap clear widths, so that some depth is introduced to overlapping bonds
    sketcher.specs.bonds_clearOverlaps_2D = true;
    // sets the shape color to improve contrast when drawing figures
    sketcher.specs.shapes_color = 'c10000';
    // because we do not load any content, we need to repaint the sketcher, otherwise we would just see an empty area with the toolbar
    // however, you can instead use one of the Canvas.load... functions to pre-populate the canvas with content, then you don't need to call repaint
    sketcher.repaint();
    
    return sketcher;
    
}

function setSketcher_2() {
    ChemDoodle.ELEMENT['H'].jmolColor = 'black';
    ChemDoodle.ELEMENT['S'].jmolColor = '#B9A130';
    var sketcher = new ChemDoodle.SketcherCanvas('sketcher', 500, 300, {
        useServices: true,
        includeToolbar: false
    });
    sketcher.specs.atoms_displayTerminalCarbonLabels_2D = true;
    sketcher.specs.atoms_useJMOLColors = true;
    sketcher.specs.bonds_clearOverlaps_2D = true;
    sketcher.specs.shapes_color = '#c10000';
    sketcher.repaint();
}