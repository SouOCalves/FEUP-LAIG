class MyTiles extends CGFobject {
	constructor(scene) {
        super(scene);
        this.firstX = 0;
        this.firstY = 0;
        
        this.tiles = [];

        this.yellowPieces = [];
        this.yellowPiecesPlaced = [];

        this.redPieces = [];
        this.redPiecesPlaced = [];

        this.greenPieces = [];
        this.greenPiecesPlaced = [];

        this.createBoard();

        this.materialBoard = new CGFappearance(this.scene);
        this.textureBoard = new CGFtexture(this.scene, "./scenes/images/dark_wood.jpg");
        this.materialBoard.setTexture(this.textureBoard);

        this.firstTile = null;

    }
    
    createBoard(){     
        this.createTiles(); 
        this.createYellowPieces();
        this.createGreenPieces();
        this.createRedPieces();


    }

    createYellowPieces(){
        for(let i = 0; i < 10; i++){
            const piece = new MyPiece(this.scene, 'yellow');
            this.yellowPieces.push(piece);
            this.scene.components.push(piece);
        }
    }

    createGreenPieces(){
        for(let i = 0; i < 20; i++){
            const piece = new MyPiece(this.scene, 'green');
            this.greenPieces.push(piece);
            this.scene.components.push(piece);
        }
    }

    createRedPieces(){
        for(let i = 0; i < 20; i++){
            const piece = new MyPiece(this.scene, 'red');
            this.redPieces.push(piece);
            this.scene.components.push(piece);
        }
    }

    createTiles(){
        let index = 0;
        for (let i = 1; i < 12; i++) {
            for(let n = 0; n < i; n++)
            {
                let tile = new MyTile(this.scene, this.firstX, this.firstY);
                this.tiles[index] = tile;
                index++;
                this.firstX -= 1.1;
            }
            this.firstX = 0.51*i;
            this.firstY += 1.1;

        }    
    }

/*     logPicking() {
		if (this.scene.pickMode == false) {
			if (this.scene.pickResults != null && this.scene.pickResults.length > 0) {
				for (var i = 0; i < this.scene.pickResults.length; i++) {
					var obj = this.scene.pickResults[i][0];
					if (obj) {
                        var customId = this.scene.pickResults[i][1];

                        // Selecting a tile with a piece
                        if(this.scene.pickResults[i][0].piece != null || this.firstTile != null)
                        {
                            //this.scene.gameOrchestrator.pickTile(this.scene.pickResults[i][0], null);
                            // To be moved
                            if(this.firstTile != null)
                            {
                                if(this.scene.pickResults[i][0].piece == null){
                                    this.scene.gameOrchestrator.pickTile(this.firstTile, this.scene.pickResults[i][0]);
                                    this.firstTile = null;
                                }
                            }
                            // Selecting the first tile
                            else
                            {
                                this.firstTile = this.scene.pickResults[i][0];
                            }
                        }
                        // Placing a new piece
                        else
                        {
                            if(this.yellowPieces.length != 0){
                                this.scene.gameOrchestrator.pickTile(null, this.scene.pickResults[i][0]);
                                console.log("Picked object: " + obj + ", with pick id " + customId);	
                            }					
                        }
					}
				}
				this.scene.pickResults.splice(0, this.scene.pickResults.length);
			}
		}
    } */
    
    setPiece(piece, tile){
        tile.setPiece(piece);
        piece.setTile(tile);
    }

    removePiece(piece, tile){
        tile.unsetPiece();
        piece.unsetTile();
    }

    getPiece(tile){
        return tile.getPiece();
    }

    getTile(piece){
        for (const tile in this.tiles) {
            if (tile.getPiece() == piece)
                return tile;
        }
        
        return null;
    }

    movePiece(piece, startingTile, endingTile){
        this.setPiece(piece, endingTile);
        this.removePiece(piece, startingTile);
    }

    unMovePiece(piece, startingTile, endingTile){
        this.removePiece(piece, endingTile);
        this.setPiece(piece, startingTile);
    }


	display(){
        let matrix = mat4.create();
        let matrix1 = mat4.create();
        let matrix2 = mat4.create();
        let matrix3 = mat4.create();

        this.displayBoard();

        // Picking setup
        
        //this.logPicking();

		for(let i = 0; i < this.tiles.length; i++){
            this.scene.registerForPick(i + 1, this.tiles[i]);
            this.tiles[i].display();
        }
        //this.scene.clearPickRegistration();

        // Display

        this.scene.pushMatrix();
        matrix = mat4.translate(matrix, matrix, [6, 11, -0.5]);
        this.scene.multMatrix(matrix);      
        matrix1 = mat4.translate(matrix1, matrix1, [0, 0, 0.2]);
        this.displayYellowPieces(matrix1);
        this.scene.popMatrix();

        matrix2 = mat4.translate(matrix2, matrix2, [6, 8, -0.5]);
        this.scene.pushMatrix();
        this.scene.multMatrix(matrix2);
        this.displayRedPieces(matrix1);
        this.scene.popMatrix();

        matrix3 = mat4.translate(matrix3, matrix3, [6, 5, -0.5]);
        this.scene.pushMatrix();
        this.scene.multMatrix(matrix3);
        this.displayGreenPieces(matrix1);
        this.scene.popMatrix();
    }

    displayYellowPieces(matrix) {
        for(let i = 0; i < this.yellowPieces.length; i++){
            if(this.yellowPieces[i].tile === null){
                this.yellowPieces[i].getMaterial().apply();
                this.yellowPieces[i].display();
                this.scene.multMatrix(matrix);
            }
        }
    }

    displayGreenPieces(matrix) {
        for(let i = 0; i < this.greenPieces.length; i++){
            if(this.greenPieces[i].tile === null){
                this.greenPieces[i].getMaterial().apply();
                this.greenPieces[i].display();
                this.scene.multMatrix(matrix);
            }
        }
    }

    displayRedPieces(matrix) {
        for(let i = 0; i < this.redPieces.length; i++){
            if(this.redPieces[i].tile === null){
                this.redPieces[i].getMaterial().apply();
                this.redPieces[i].display();
                this.scene.multMatrix(matrix);
            }
        }
    }

    displayBoard(){
        this.materialBoard.apply();
        let plane = new Plane(this.scene, 10, 10);
        let matrix = mat4.create();

        matrix = mat4.translate(matrix, matrix, [-0.4, 5.5, -0.5]);
        matrix = mat4.scale(matrix, matrix, [15, 15, 1]);

        this.setMaterialBoard();

        this.scene.pushMatrix();
        this.scene.multMatrix(matrix);

        plane.display();

        this.scene.popMatrix();
    }

    
    setMaterialBoard(){
        this.materialBoard.setAmbient(0, 0, 0.1, 1);
        this.materialBoard.setEmission(0, 0, 0.1, 1);
        this.materialBoard.apply();
    }
}