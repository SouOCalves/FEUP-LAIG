class MyTriangle extends CGFobject {
	constructor(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3, amp_u, amp_v) {
		super(scene);

		this.x1 = x1;
		this.y1 = y1;
		this.z1 = z1;

		this.x2 = x2;
		this.y2 = y2;
		this.z2 = z2;

		this.x3 = x3;
		this.y3 = y3;
		this.z3 = z3;

		this.amp_u = amp_u;
		this.amp_v = amp_v;

		this.initBuffers();
	}


	initBuffers() {
		this.vertices = [this.x1, this.y1, this.z1, this.x2, this.y2, this.z2, this.x3, this.y3, this.z3];

		this.indices = [0, 1, 2, 2, 1, 0];
		this.texCoords = [];

		var vx = this.x2 - this.x1;
		var vy = this.y2 - this.y1;
		var vz = this.z2 - this.z1;

		var wx = this.x3 - this.x1;
		var wy = this.y3 - this.y1;
		var wz = this.z3 - this.z1;

		var normal_x = (vy * wz) - (wz * wy);
		var normal_y = (vz * wx) - (vx * wz);
		var normal_z = (vx * wy) - (vy * wx);

		this.normals = [
			normal_x, normal_y, normal_z,
			normal_x, normal_y, normal_z,
			normal_x, normal_y, normal_z
		]

		var distance_a = Math.sqrt(Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2) + Math.pow(this.z2 - this.z1, 2));
		var distance_b = Math.sqrt(Math.pow(this.x3 - this.x2, 2) + Math.pow(this.y3 - this.y2, 2) + Math.pow(this.z3 - this.z2, 2));
		var distance_c = Math.sqrt(Math.pow(this.x1 - this.x3, 2) + Math.pow(this.y1 - this.y3, 2) + Math.pow(this.z1 - this.z3, 2));

		var cos_alpha = (distance_a * distance_a - distance_b * distance_b + distance_c * distance_c) / 2 * distance_a * distance_c;
		var sin_alpha = Math.sqrt(1 - cos_alpha * cos_alpha);

		this.texCoords=[
            0, 0,
            this.distance_a, 0,
            this.c * this.cos_alpha, this.distance_c * this.sin_alpha,

            0, 0,
            this.distance_a, 0,
            this.distance_c * this.cos_alpha, this.distance_c * this.sin_alpha
        ];



		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}