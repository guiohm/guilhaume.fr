var sacred;

var Sacred = function() {

    var _this = this;

    // set the scene size
    var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;

    // set some camera attributes
    var VIEW_ANGLE = 45,
      ASPECT = WIDTH / HEIGHT,
      NEAR = 0.1,
      FAR = 10000;

    var mouseX = 0, mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    var camera, controls, renderer, scene;
    this.transparent = false;
    this.mesh;

    this.colors = [
        0x0070ff, // 0 indigo
        0x2000f0, // 1 bleu
        0x8000ff, // 2 violet
        0x00f0b0, // 3 turquoise
        0xffff00, // 4 jaune
        0xff00ff, // 5 magenta
        0x00ddff, // 6 cyan
        0xff8000, // 7 orange
        0xa0f500, // 8 citron vert
        0xf00000, // 9 rouge
        0xff0080, // 10 ecarlate
        0x00ff00, // 11 vert
    ];
    var colors = [
        0x0070ff, // 0 indigo
        0x2000f0, // 1 bleu
        0x8000ff, // 2 violet
        0x00f0b0, // 3 turquoise
        0xffff00, // 4 jaune
        0xff00ff, // 5 magenta
        0x00ddff, // 6 cyan
        0xff8000, // 7 orange
        0xa0f500, // 8 citron vert
        0xf00000, // 9 rouge
        0xff0080, // 10 ecarlate
        0x00ff00, // 11 vert
    ];

    this.init = function() {
        // create a WebGL renderer, camera
        // and a scene
        renderer = new THREE.WebGLRenderer({antialias: false});
        camera = new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR);

        scene = new THREE.Scene();

        // add the camera to the scene
        scene.add(camera);

        // the camera starts at 0,0,0
        // so pull it back
        camera.position.z = 500;

        // start the renderer
        renderer.setSize(WIDTH, HEIGHT);
        renderer.setClearColor( 0x000000 );

        // controls = new THREE.OrbitControls( camera );
        // controls.addEventListener( 'change', render );


        // DODECAHEDRON

        var geometry = new THREE.DodecahedronGeometry(161);
        var materials = [];
        for (var i = 0, j = geometry.faces.length; i < j; i++ ) {
            var face = geometry.faces[i];
            // Le dodecahedre a 36 faces, il font donc assigner la même couleur à 3 faces consécutives
            face.materialIndex = parseInt(i/ (j/colors.length));
            if (i < colors.length) {
                var material = new THREE.MeshPhongMaterial( {color: colors[i], shininess: 66, shading: THREE.FlatShading} );
                materials.push(material);
            }
        }
        geometry.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI * ((180-116.56)/2) / 180 ) );

        var main_material = new THREE.MeshFaceMaterial( materials );

        var Dodecahedron = new THREE.Mesh( geometry, main_material );
        scene.add( Dodecahedron );
        _this.mesh = Dodecahedron;

        //

        // DODECAEDRE ETOILE

        var StellatedDodecahedron = createStellatedDodecahedron();
        var StellatedInvertedDodecahedron = createStellatedDodecahedron('etoile-in');

        // DODECAEDRE CHRISTIQUE

        var ChristDodecahedron = createStellatedDodecahedron('christ');
        var ChristInvertedDodecahedron = createStellatedDodecahedron('christ-in');

        //

        // ICOSAEDRE

        var geometry = new THREE.IcosahedronGeometry(161);
        var materials = [];
        for (var i = 0, j = geometry.faces.length; i < j; i++ ) {
            var face = geometry.faces[i];
            // Le dodecahedre a 36 faces, il font donc assigner la même couleur à 3 faces consécutives
            face.materialIndex = parseInt(i/ (j/colors.length));
            if (i < colors.length) {
                var material = new THREE.MeshPhongMaterial( {color: colors[i], shininess: 66, shading: THREE.FlatShading} );
                materials.push(material);
            }
        }
        geometry.applyMatrix( new THREE.Matrix4().makeRotationZ( Math.PI * ((-138.19/4)) / 180 ) );

        var main_material = new THREE.MeshFaceMaterial( materials );

        var Icosahedron = new THREE.Mesh( geometry, main_material );


        //

        // PARTICLES

        var geometry = new THREE.Geometry();

        for ( var i = 0; i < 5000; i ++ ) {
            var vertex = new THREE.Vector3();
            vertex.x = THREE.Math.randFloatSpread( 2000 );
            vertex.y = THREE.Math.randFloatSpread( 2000 );
            vertex.z = THREE.Math.randFloat( -1000, 400 );
            geometry.vertices.push( vertex );
        }

        var particles = new THREE.PointCloud( geometry, new THREE.PointCloudMaterial( { color: 0xffffff } ) );
        scene.add( particles );

        //

        // PLANE

        var plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry( 10000, 10000 ),
            new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: 0.5, transparent: false } )
        );
        plane.position.y = -170;
        plane.rotation.x = - Math.PI / 2;
        // scene.add( plane );

        //

        // LIGHT

        // create a point light
        var pointLight = new THREE.PointLight(0xFFFFFF);
        pointLight.position.x = 100;
        pointLight.position.y = 100;
        pointLight.position.z = 130;
        // add to the scene
        // scene.add(pointLight);

        // White directional light at half intensity shining from the top.
        var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        directionalLight.position.set( 0, 200, 0 ).normalize();
        scene.add( directionalLight );

        var spotLight = new THREE.SpotLight( 0xffffff, 0.6 );
        spotLight.position.set( 500, 700, 400 );
        // spotLight.castShadow = true;
        // spotLight.shadowMapWidth = 1024;
        // spotLight.shadowMapHeight = 1024;
        // spotLight.shadowCameraNear = 100;
        // spotLight.shadowCameraFar = 4000;
        // spotLight.shadowCameraFov = 30;
        scene.add( spotLight );

        var spotLight = new THREE.SpotLight( 0xffffff, 0.6 );
        spotLight.position.set( -100, -200, 300 );
        // spotLight.castShadow = true;
        // spotLight.shadowMapWidth = 1024;
        // spotLight.shadowMapHeight = 1024;
        // spotLight.shadowCameraNear = 500;
        // spotLight.shadowCameraFar = 4000;
        // spotLight.shadowCameraFov = 30;
        scene.add( spotLight );

        var hemisphereLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.2 ); // soft white light
        scene.add( hemisphereLight );

        var light = new THREE.AmbientLight( 0xffffff, 0.5 ); // soft white light
        // scene.add( light );

        //


        // scene.fog = new THREE.Fog(0x000000, 100, 4000);
        // renderer.setClearColor( scene.fog.color, 0.2 );

        // attach the render-supplied DOM element
        document.body.appendChild( renderer.domElement );


        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        // document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );
        window.addEventListener( 'resize', onWindowResize, false );

        if( THREEx.FullScreen.available() ){
            THREEx.FullScreen.bindKey();
            // document.getElementById('inlineDoc').innerHTML  += "- <i>f</i> for fullscreen";
        }

        document.getElementById('dodecaedre').addEventListener( 'click', function() {
            scene.remove(_this.mesh);
            _this.mesh = Dodecahedron;
            scene.add(_this.mesh);
        }, false );

        document.getElementById('dode-etoile').addEventListener( 'click', function() {
            scene.remove(_this.mesh);
            _this.mesh = StellatedDodecahedron;
            scene.add(_this.mesh);
        }, false );

        document.getElementById('dode-etoile-in').addEventListener( 'click', function() {
            scene.remove(_this.mesh);
            _this.mesh = StellatedInvertedDodecahedron;
            scene.add(_this.mesh);
        }, false );

        document.getElementById('dode-christ').addEventListener( 'click', function() {
            scene.remove(_this.mesh);
            _this.mesh = ChristDodecahedron;
            scene.add(_this.mesh);
        }, false );

        document.getElementById('dode-christ-in').addEventListener( 'click', function() {
            scene.remove(_this.mesh);
            _this.mesh = ChristInvertedDodecahedron;
            scene.add(_this.mesh);
        }, false );

        document.getElementById('icosaedre').addEventListener( 'click', function() {
            scene.remove(_this.mesh);
            _this.mesh = Icosahedron;
            scene.add(_this.mesh);
        }, false );

    };

    this.animate = function() {
        requestAnimationFrame(_this.animate);
        render();
    };

    var render = function() {
        camera.position.x += ( mouseX - camera.position.x ) * 0.02;
        camera.position.y += ( - mouseY - camera.position.y );

        camera.lookAt( scene.position );

        if (_this.mesh) {
            // mesh.rotation.x += 0.0007*mouseY;
            _this.mesh.rotation.y -= 0.0003*mouseX;
        }

        renderer.render( scene, camera );
    };

    var onWindowResize = function() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );
    };

    var onDocumentMouseMove = function( event ) {
        mouseX = ( event.clientX - windowHalfX );
        mouseY = ( event.clientY - windowHalfY );
    };

    var onDocumentTouchStart = function( event ) {
        if ( event.touches.length === 1 ) {
            event.preventDefault();
            mouseX = event.touches[ 0 ].pageX - windowHalfX;
            mouseY = event.touches[ 0 ].pageY - windowHalfY;
        }
    };

    var onDocumentTouchMove = function( event ) {
        if ( event.touches.length === 1 ) {
            event.preventDefault();
            mouseX = event.touches[ 0 ].pageX - windowHalfX;
            mouseY = event.touches[ 0 ].pageY - windowHalfY;
        }
    };
};




window.onload = function() {
    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
    sacred = new Sacred();
    sacred.init();
    sacred.animate();

    // var gui = new dat.GUI();
    // gui.add(sacred, 'colors');
    // gui.add(sacred, 'transparent')
    //    .onChange(function(value) {
    //         sacred.mesh.material.transparent = value;
    //     });
};




/*
constructed from 12 pentagonal pyramids placed
on the faces of a dodecahedron.
first 20 points are the vertices of a dodecahedron
next 12 points are the vertices of the centers
of the faces of the dodecahedron

if scale = 0 a dodecahedron is created

if scale is positive the centers of the
faces are moved out fron the center of the
dodecahedron

if scale is negative the centers of the
faces are moved in towards the center of the
dodecahedron

the apex angles of the triangles that make up
the faces of the stellated dodecahedron
are 36 degrees - the scale factor that
makes a small stellated dodecahedron
is approximately 2.3417
length of side of pentagonal pyramid for
small stellated dodecahedron = 2

the apex angles of the triangles that make up
the faces of a pentakis dodecahedron ( one of
the Catalan solids) are about 68.619 degrees
the scale factor to make one is ca 0.4279

if len = length of the sides of the
pentagonal pyramid then approximately

scale = + or - sqrt((len*len/0.52786) - 2.09443)

lengths of the sides of the base are sqrt(5)-1
or 1.23607 to make equilateral triangles scale
factor is 0.8944

distance from centers of faces to origin ca 1.37638
distance from dodecahedral points to origin sqrt(3)

Adapted from http://www.thingiverse.com/thing:197620
*/
function createStellatedDodecahedron(variation) {
    var scale = 2.3417;

    if (variation === 'christ') {
        scale = 0.8944;
    } else if (variation === 'christ-in') {
        scale = -0.8944;
    } else if (variation === 'etoile-in') {
        scale = -1.88;
    }

    var a = scale*0.61803;
    var b = scale*0.38197;

    var vertices = [
         [   1.00000,   1.00000,   1.00000],
         [   1.00000,   1.00000,  -1.00000],
         [   1.00000,  -1.00000,   1.00000],
         [   1.00000,  -1.00000,  -1.00000],
         [  -1.00000,   1.00000,   1.00000],
         [  -1.00000,   1.00000,  -1.00000],
         [  -1.00000,  -1.00000,   1.00000],
         [  -1.00000,  -1.00000,  -1.00000],
         [   0.00000,   0.61803,   1.61803],
         [   0.00000,   0.61803,  -1.61803],
         [   0.00000,  -0.61803,   1.61803],
         [   0.00000,  -0.61803,  -1.61803],
         [   0.61803,   1.61803,   0.00000],
         [   0.61803,  -1.61803,   0.00000],
         [  -0.61803,   1.61803,   0.00000],
         [  -0.61803,  -1.61803,   0.00000],
         [   1.61803,   0.00000,   0.61803],
         [   1.61803,   0.00000,  -0.61803],
         [  -1.61803,   0.00000,   0.61803],
         [  -1.61803,   0.00000,  -0.61803],
         [   1.17082+a,   0.72361+b,   0.00000],
         [   0.72361+b,   0.00000,   1.17082+a],
         [   0.00000,   1.17082+a,   0.72361+b],
         [   0.00000,   1.17082+a,  -0.72361-b],
         [   0.72361+b,   0.00000,  -1.17082-a],
         [   1.17082+a,  -0.72361-b,   0.00000],
         [   0.00000,  -1.17082-a,   0.72361+b],
         [   0.00000,  -1.17082-a,  -0.72361-b],
         [  -0.72361-b,   0.00000,   1.17082+a],
         [  -1.17082-a,   0.72361+b,   0.00000],
         [  -0.72361-b,   0.00000,  -1.17082-a],
         [  -1.17082-a,  -0.72361-b,   0.00000],
    ];

    var indicesOfFaces = [
        [0,20,16],[16,20,17],[17,20,1],
        [1,20,12],[12,20,0],
        [0,21,8],[8,21,10],[10,21,2],
        [2,21,16],[16,21,0],
         [0,22,12],[12,22,14],[14,22,4],
        [4,22,8],[8,22,0],
        [1,23,9],[9,23,5],[5,23,14],
        [14,23,12],[12,23,1],
        [1,24,17],[17,24,3],[3,24,11],
        [11,24,9],[9,24,1],
        [16,25,2],[17,25,16],[3,25,17],
         [13,25,3],[2,25,13],
         [2,26,10],[10,26,6],[6,26,15],
         [15,26,13],[13,26,2],
         [3,27,13],[13,27,15],[15,27,7],
         [7,27,11],[11,27,3],
        [4,28,18],[18,28,6],[6,28,10],
         [10,28,8],[8,28,4],
         [4,29,14],[14,29,5],[5,29,19],
         [19,29,18],[18,29,4],
          [5,30,9],[9,30,11],[11,30,7],
         [7,30,19],[19,30,5],
         [6,31,18],[18,31,19],[19,31,7],
         [7,31,15],[15,31,6],
    ];

    var colormap = [
        9,
        1,
        0,
        7,
        10,
        11,
        8,
        2,
        5,
        6,
        4,
        3
    ]

    // var geometry = new THREE.PolyhedronGeometry( vertices, indicesOfFaces, 100);
    // var material = new THREE.MeshPhongMaterial({color: 0x00ff00, shininess: 66, shading: THREE.FlatShading});
    // return new THREE.Mesh( geometry, material );
    return polyhedronDataToMesh({
        vertex: vertices,
        face: indicesOfFaces,
        colormap: colormap
    });
}

function polyhedronDataToMesh(data)
{
    // var polyhedron = new THREE.Object3D();

    // convert vertex data to THREE.js vectors
    var vertex = []
    for (var i = 0; i < data.vertex.length; i++)
        vertex.push( new THREE.Vector3( data.vertex[i][0], data.vertex[i][1], data.vertex[i][2] ).multiplyScalar(80) );

    var materials = [];
    for (var i = sacred.colors.length - 1; i >= 0; i--) {
        var color = sacred.colors[i];
        if (data.colormap) {
            color = sacred.colors[data.colormap[i]];
        }
        materials.push(new THREE.MeshPhongMaterial({
            color: color,
            shininess: 66,
            shading: THREE.FlatShading,
            opacity: 0.6,
            transparent: true,
            side: THREE.DoubleSide,
            wireframe: true
        }));
    };

    var faceMaterial = new THREE.MeshFaceMaterial( materials );

    var geometry = new THREE.Geometry();
    geometry.vertices = vertex;
    var faceIndex = 0;
    for (var faceNum = 0; faceNum < data.face.length; faceNum++)
    {
        var materialIndex = parseInt(faceNum/ (data.face.length/materials.length));
        for (var i = 0; i < data.face[faceNum].length - 2; i++)
        {
            geometry.faces[faceIndex] = new THREE.Face3( data.face[faceNum][0], data.face[faceNum][i+1], data.face[faceNum][i+2] );
            // geometry.faces[faceIndex].color = new THREE.Color(0x333333);
            geometry.faces[faceIndex].materialIndex = materialIndex;
            // console.log(geometry.faces[faceIndex])
            faceIndex++;
        }
    }

    // invert faces normals
    geometry.applyMatrix(new THREE.Matrix4().makeScale( -1, 1, 1 ) );

    geometry.computeFaceNormals();
    // geometry.computeVertexNormals();
    geometry.computeBoundingSphere();


    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI * ((180-116.56)/2) / 180 ) );

    faces = new THREE.Mesh(geometry, faceMaterial);
    faces.scale.multiplyScalar(180 / geometry.boundingSphere.radius);

    return faces;
}
