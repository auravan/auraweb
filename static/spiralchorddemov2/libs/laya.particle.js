(function (exports, Laya) {
    'use strict';

    exports.Particle2DSimulationSpace = void 0;
    (function (Particle2DSimulationSpace) {
        Particle2DSimulationSpace[Particle2DSimulationSpace["Local"] = 0] = "Local";
        Particle2DSimulationSpace[Particle2DSimulationSpace["World"] = 1] = "World";
    })(exports.Particle2DSimulationSpace || (exports.Particle2DSimulationSpace = {}));
    exports.Particle2DScalingMode = void 0;
    (function (Particle2DScalingMode) {
        Particle2DScalingMode[Particle2DScalingMode["Hierarchy"] = 0] = "Hierarchy";
        Particle2DScalingMode[Particle2DScalingMode["Local"] = 1] = "Local";
    })(exports.Particle2DScalingMode || (exports.Particle2DScalingMode = {}));
    class Main2DModule {
        get startSizeX() {
            return this._startSizeX;
        }
        set startSizeX(value) {
            this._startSizeX = value;
            this._startSizeY.mode = value.mode;
        }
        get startSizeY() {
            return this._startSizeY;
        }
        set startSizeY(value) {
            this._startSizeY = value;
            this._startSizeX.mode = value.mode;
        }
        get startSize() {
            return this.startSizeX;
        }
        set startSize(value) {
            this.startSizeX = value;
        }
        get maxParticles() {
            return this._maxParticles;
        }
        set maxParticles(value) {
            this._maxParticles = Math.floor(value);
        }
        constructor() {
            this.duration = 5;
            this.looping = true;
            this.playOnAwake = true;
            this.startDelay = new Laya.ParticleMinMaxCurve();
            this.startLifetime = new Laya.ParticleMinMaxCurve();
            this.startSpeed = new Laya.ParticleMinMaxCurve();
            this.startSize2D = false;
            this._startSizeX = new Laya.ParticleMinMaxCurve();
            this._startSizeY = new Laya.ParticleMinMaxCurve();
            this.startRotation = new Laya.ParticleMinMaxCurve();
            this.startColor = new Laya.ParticleMinMaxGradient();
            this._gravity = new Laya.Vector2();
            this.gravityModifier = 0;
            this._spriteRotAndScale = new Laya.Vector4();
            this._spriteTranslateAndSpace = new Laya.Vector3();
            this.simulationSpace = exports.Particle2DSimulationSpace.Local;
            this.simulationSpeed = 1;
            this.scaleMode = exports.Particle2DScalingMode.Local;
            this._maxParticles = 100;
            this.autoRandomSeed = true;
            this.randomSeed = 0;
            this.unitPixels = 50;
            this.startDelay.mode = Laya.ParticleMinMaxCurveMode.Constant;
            this.startDelay.constant = 0;
            this.startLifetime.mode = Laya.ParticleMinMaxCurveMode.Constant;
            this.startLifetime.constant = 5;
            this.startSpeed.mode = Laya.ParticleMinMaxCurveMode.Constant;
            this.startSpeed.constant = 5;
            this.startSizeX.mode = Laya.ParticleMinMaxCurveMode.Constant;
            this.startSizeX.constant = 0.5;
            this.startSizeY.mode = Laya.ParticleMinMaxCurveMode.Constant;
            this.startSizeY.constant = 0.5;
            this.startRotation.mode = Laya.ParticleMinMaxCurveMode.Constant;
            this.startRotation.constant = 0;
            this.startColor.mode = Laya.ParticleMinMaxGradientMode.Color;
            this.startColor.color.setValue(1, 1, 1, 1);
        }
        cloneTo(destObject) {
            destObject.duration = this.duration;
            destObject.looping = this.looping;
            destObject.playOnAwake = this.playOnAwake;
            this.startDelay.cloneTo(destObject.startDelay);
            this.startLifetime.cloneTo(destObject.startLifetime);
            this.startSpeed.cloneTo(destObject.startSpeed);
            destObject.startSize2D = this.startSize2D;
            this.startSizeX.cloneTo(destObject.startSizeX);
            this.startSizeY.cloneTo(destObject.startSizeY);
            destObject.startRotation = this.startRotation;
            this.startColor.cloneTo(destObject.startColor);
            destObject.gravityModifier = this.gravityModifier;
            destObject.simulationSpace = this.simulationSpace;
            destObject.simulationSpeed = this.simulationSpeed;
            destObject.scaleMode = this.scaleMode;
            destObject.maxParticles = this.maxParticles;
            destObject.autoRandomSeed = this.autoRandomSeed;
            destObject.randomSeed = this.randomSeed;
            destObject.unitPixels = this.unitPixels;
        }
        clone() {
            let dest = new Main2DModule();
            this.cloneTo(dest);
            return dest;
        }
    }

    class Rotation2DOverLifetimeModule {
        constructor() {
            this.enable = true;
            this.angularVelocity = new Laya.ParticleMinMaxCurve();
            this.angularVelocity.mode = Laya.ParticleMinMaxCurveMode.Constant;
            this.angularVelocity.constantMin = 45;
            this.angularVelocity.constantMax = 45;
            this.angularVelocity.curveMin.add(0, 45);
            this.angularVelocity.curveMin.add(1, 45);
            this.angularVelocity.curveMax.add(0, 45);
            this.angularVelocity.curveMax.add(1, 45);
        }
        cloneTo(destObject) {
            destObject.enable = this.enable;
            this.angularVelocity.cloneTo(destObject.angularVelocity);
        }
        clone() {
            let dest = new Rotation2DOverLifetimeModule();
            this.cloneTo(dest);
            return dest;
        }
    }

    exports.Base2DShapeType = void 0;
    (function (Base2DShapeType) {
        Base2DShapeType[Base2DShapeType["Fan"] = 0] = "Fan";
        Base2DShapeType[Base2DShapeType["Circle"] = 1] = "Circle";
        Base2DShapeType[Base2DShapeType["Box"] = 2] = "Box";
        Base2DShapeType[Base2DShapeType["Semicircle"] = 3] = "Semicircle";
        Base2DShapeType[Base2DShapeType["None"] = 4] = "None";
    })(exports.Base2DShapeType || (exports.Base2DShapeType = {}));
    class Base2DShape {
        constructor(type) {
            this.type = exports.Base2DShapeType.None;
            this.posAndDir = new Laya.Vector4();
            this.type = type;
        }
    }

    const Angle2Radian = Math.PI / 180;
    exports.FanShapeEmitType = void 0;
    (function (FanShapeEmitType) {
        FanShapeEmitType[FanShapeEmitType["Base"] = 0] = "Base";
        FanShapeEmitType[FanShapeEmitType["Area"] = 1] = "Area";
    })(exports.FanShapeEmitType || (exports.FanShapeEmitType = {}));
    class FanShape extends Base2DShape {
        constructor() {
            super(exports.Base2DShapeType.Fan);
            this.angle = 25;
            this.radius = 1;
            this.emitType = exports.FanShapeEmitType.Base;
            this.length = 5;
        }
        getPositionAndDirection() {
            let radius = this.radius;
            let randomRadius = (Math.random() * 2 - 1);
            let radians = this.angle * randomRadius * Angle2Radian;
            let xDir = Math.sin(radians);
            let yDir = Math.cos(radians);
            let y = 0;
            let x = randomRadius * radius;
            switch (this.emitType) {
                case exports.FanShapeEmitType.Area:
                    {
                        y = this.length * Math.random();
                        x += y * Math.tan(radians);
                        break;
                    }
                case exports.FanShapeEmitType.Base:
            }
            let pAndd = this.posAndDir;
            pAndd.setValue(x, y, xDir, yDir);
            return pAndd;
        }
        cloneTo(destObject) {
            destObject.angle = this.angle;
            destObject.radius = this.radius;
            destObject.emitType = this.emitType;
            destObject.length = this.length;
        }
        clone() {
            let destObject = new FanShape();
            this.cloneTo(destObject);
            return destObject;
        }
    }

    class Shape2DModule {
        constructor() {
            this.enable = true;
            this.shape = new FanShape();
        }
        cloneTo(destObject) {
            destObject.enable = this.enable;
            this.shape.cloneTo(destObject.shape);
        }
        clone() {
            let destObject = new Shape2DModule();
            this.cloneTo(destObject);
            return destObject;
        }
    }

    class Box2DShape extends Base2DShape {
        constructor() {
            super(exports.Base2DShapeType.Box);
            this.size = new Laya.Vector2(1, 1);
            this.randomDirection = false;
        }
        getPositionAndDirection() {
            let x = Math.random() * this.size.x + this.size.x * -0.5;
            let y = Math.random() * this.size.y + this.size.y * -0.5;
            let xDir = 0;
            let yDir = 1;
            if (this.randomDirection) {
                let radians = Math.random() * Math.PI * 2;
                xDir = Math.sin(radians);
                yDir = Math.cos(radians);
            }
            this.posAndDir.setValue(x, y, xDir, yDir);
            return this.posAndDir;
        }
        cloneTo(destObject) {
            this.size.cloneTo(destObject.size);
            destObject.randomDirection = this.randomDirection;
        }
        clone() {
            let destObject = new Box2DShape();
            this.cloneTo(destObject);
            return destObject;
        }
    }

    class Circle2DShape extends Base2DShape {
        constructor() {
            super(exports.Base2DShapeType.Circle);
            this.radius = 1;
            this.emitFromEdge = false;
            this.randomDirction = false;
        }
        getPositionAndDirection() {
            let radians = Math.random() * Math.PI * 2;
            let xDir = Math.sin(radians);
            let yDir = Math.cos(radians);
            let x = 0;
            let y = 0;
            if (this.emitFromEdge) {
                x = xDir * this.radius;
                y = yDir * this.radius;
            }
            else {
                let length = Math.random() * this.radius;
                x = xDir * length;
                y = yDir * length;
            }
            if (this.randomDirction) {
                let radians = Math.random() * Math.PI * 2;
                xDir = Math.sin(radians);
                yDir = Math.cos(radians);
            }
            this.posAndDir.setValue(x, y, xDir, yDir);
            return this.posAndDir;
        }
        cloneTo(destObject) {
            destObject.radius = this.radius;
            destObject.emitFromEdge = this.emitFromEdge;
            destObject.randomDirction = this.randomDirction;
        }
        clone() {
            let destObject = new Circle2DShape();
            this.cloneTo(destObject);
            return destObject;
        }
    }

    class SemicircleShap extends Base2DShape {
        constructor() {
            super(exports.Base2DShapeType.Semicircle);
            this.radius = 1;
            this.emitFromEdge = false;
            this.randomDirction = false;
        }
        getPositionAndDirection() {
            let radians = Math.random() * Math.PI - Math.PI * 0.5;
            let xDir = Math.sin(radians);
            let yDir = Math.cos(radians);
            let x = 0;
            let y = 0;
            if (this.emitFromEdge) {
                x = xDir * this.radius;
                y = yDir * this.radius;
            }
            else {
                let length = Math.random() * this.radius;
                x = xDir * length;
                y = yDir * length;
            }
            if (this.randomDirction) {
                let radians = Math.random() * Math.PI - Math.PI * 0.5;
                xDir = Math.sin(radians);
                yDir = Math.cos(radians);
            }
            this.posAndDir.setValue(x, y, xDir, yDir);
            return this.posAndDir;
        }
        cloneTo(destObject) {
            destObject.radius = this.radius;
            destObject.emitFromEdge = this.emitFromEdge;
            destObject.randomDirction = this.randomDirction;
        }
        clone() {
            let destObject = new SemicircleShap();
            this.cloneTo(destObject);
            return destObject;
        }
    }

    class Size2DOverLifetimeModule {
        get x() {
            return this._x;
        }
        set x(value) {
            this._x = value;
            this._y.mode = value.mode;
        }
        get y() {
            return this._y;
        }
        set y(value) {
            this._y = value;
            this._x.mode = value.mode;
        }
        get size() {
            return this.x;
        }
        set size(value) {
            this.x = value;
        }
        constructor() {
            this.enable = true;
            this.separateAxes = false;
            this._x = new Laya.ParticleMinMaxCurve();
            this._y = new Laya.ParticleMinMaxCurve();
            this.x.mode = Laya.ParticleMinMaxCurveMode.Constant;
            this.x.constantMin = 1;
            this.x.constantMax = 1;
            this.x.curveMin.add(0, 0);
            this.x.curveMin.add(1, 1);
            this.x.curveMax.add(0, 0);
            this.x.curveMax.add(1, 1);
            this.y.mode = Laya.ParticleMinMaxCurveMode.Constant;
            this.y.constantMin = 1;
            this.y.constantMax = 1;
            this.y.curveMin.add(0, 0);
            this.y.curveMin.add(1, 1);
            this.y.curveMax.add(0, 0);
            this.y.curveMax.add(1, 1);
        }
        cloneTo(destObject) {
            destObject.enable = this.enable;
            destObject.separateAxes = this.separateAxes;
            this.x.cloneTo(destObject.x);
            this.y.cloneTo(destObject.y);
        }
        clone() {
            let dest = new Size2DOverLifetimeModule();
            this.cloneTo(dest);
            return dest;
        }
    }

    exports.Velocity2DSimulateSpace = void 0;
    (function (Velocity2DSimulateSpace) {
        Velocity2DSimulateSpace[Velocity2DSimulateSpace["Local"] = 0] = "Local";
        Velocity2DSimulateSpace[Velocity2DSimulateSpace["World"] = 1] = "World";
    })(exports.Velocity2DSimulateSpace || (exports.Velocity2DSimulateSpace = {}));
    class Velocity2DOverLifetimeModule {
        get x() {
            return this._x;
        }
        set x(value) {
            this._x = value;
            this._y.mode = value.mode;
        }
        get y() {
            return this._y;
        }
        set y(value) {
            this._y = value;
            this._x.mode = value.mode;
        }
        constructor() {
            this.enable = true;
            this.space = exports.Velocity2DSimulateSpace.Local;
            this._x = new Laya.ParticleMinMaxCurve();
            this._y = new Laya.ParticleMinMaxCurve();
        }
        cloneTo(destObject) {
            destObject.enable = this.enable;
            destObject.space = this.space;
            this.x.cloneTo(destObject.x);
            this.y.cloneTo(destObject.y);
        }
        clone() {
            let dest = new Velocity2DOverLifetimeModule();
            this.cloneTo(dest);
            return dest;
        }
    }

    class Particle2DGeomotry {
        constructor(maxParticleCount, particleDeclaration, meshDeclaration) {
            this.maxParitcleCount = 0;
            this.maxParitcleCount = maxParticleCount;
            this.bufferState = Laya.LayaGL.renderDeviceFactory.createBufferState();
            maxParticleCount += 1;
            {
                let vertexCount = 4 * maxParticleCount;
                let particleBuffer = this.particleBuffer = Laya.LayaGL.renderDeviceFactory.createVertexBuffer(Laya.BufferUsage.Dynamic);
                particleBuffer.vertexDeclaration = particleDeclaration;
                let particleFloatStride = particleDeclaration.vertexStride / 4;
                let particleData = this.particleDatas = new Float32Array(vertexCount * particleFloatStride);
                particleBuffer.setDataLength(particleData.byteLength);
                let meshBuffer = Laya.LayaGL.renderDeviceFactory.createVertexBuffer(Laya.BufferUsage.Static);
                meshBuffer.vertexDeclaration = meshDeclaration;
                let meshFloatStride = meshDeclaration.vertexStride / 4;
                let meshData = new Float32Array(vertexCount * meshFloatStride);
                for (let i = 0; i < maxParticleCount; i++) {
                    let offset = i * 4 * meshFloatStride;
                    let pos0 = offset;
                    meshData[pos0 + 0] = -0.5;
                    meshData[pos0 + 1] = -0.5;
                    meshData[pos0 + 2] = 0;
                    meshData[pos0 + 3] = 0;
                    let pos1 = offset + meshFloatStride;
                    meshData[pos1 + 0] = 0.5;
                    meshData[pos1 + 1] = -0.5;
                    meshData[pos1 + 2] = 1;
                    meshData[pos1 + 3] = 0;
                    let pos2 = offset + 2 * meshFloatStride;
                    meshData[pos2 + 0] = 0.5;
                    meshData[pos2 + 1] = 0.5;
                    meshData[pos2 + 2] = 1;
                    meshData[pos2 + 3] = 1;
                    let pos3 = offset + 3 * meshFloatStride;
                    meshData[pos3 + 0] = -0.5;
                    meshData[pos3 + 1] = 0.5;
                    meshData[pos3 + 2] = 0;
                    meshData[pos3 + 3] = 1;
                }
                meshBuffer.setDataLength(meshData.byteLength);
                meshBuffer.setData(meshData.buffer, 0, 0, meshData.byteLength);
                let indexBuffer = this.indexBuffer = Laya.LayaGL.renderDeviceFactory.createIndexBuffer(Laya.BufferUsage.Static);
                let indexCount = 6 * maxParticleCount;
                let indexFormat = vertexCount > 65535 ? Laya.IndexFormat.UInt32 : Laya.IndexFormat.UInt16;
                let indexData;
                if (indexFormat == Laya.IndexFormat.UInt16) {
                    indexData = new Uint16Array(indexCount);
                }
                else {
                    indexData = new Uint32Array(indexCount);
                }
                const meshIndies = [0, 1, 2, 0, 2, 3];
                for (let i = 0; i < maxParticleCount; i++) {
                    let offset = i * 6;
                    indexData[offset + 0] = meshIndies[0] + 4 * i;
                    indexData[offset + 1] = meshIndies[1] + 4 * i;
                    indexData[offset + 2] = meshIndies[2] + 4 * i;
                    indexData[offset + 3] = meshIndies[3] + 4 * i;
                    indexData[offset + 4] = meshIndies[4] + 4 * i;
                    indexData[offset + 5] = meshIndies[5] + 4 * i;
                }
                indexBuffer.indexCount = indexCount;
                indexBuffer.indexType = indexFormat;
                indexBuffer._setIndexDataLength(indexData.byteLength);
                indexBuffer._setIndexData(indexData, 0);
                this.bufferState.applyState([meshBuffer, particleBuffer], indexBuffer);
            }
            {
                let geometry = Laya.LayaGL.renderDeviceFactory.createRenderGeometryElement(Laya.MeshTopology.Triangles, Laya.DrawType.DrawElement);
                geometry.indexFormat = this.indexBuffer.indexType;
                geometry.bufferState = this.bufferState;
                this.geometry = geometry;
            }
        }
        destroy() {
            this.geometry.destroy();
            this.bufferState.destroy();
        }
    }

    class Particle2DShader {
        static init() {
            const uniformMap = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap("_Particle2D");
            const addUniform = (name, type) => {
                let index = Laya.Shader3D.propertyNameToID(name);
                uniformMap.addShaderUniform(index, name, type);
                return index;
            };
            const addUniformArray = (name, type, arrayLength) => {
                let index = Laya.Shader3D.propertyNameToID(name);
                uniformMap.addShaderUniformArray(index, name, type, arrayLength);
                return index;
            };
            Particle2DShader.CurrentTime = addUniform("u_CurrentTime", Laya.ShaderDataType.Float);
            Particle2DShader.UnitPixels = addUniform("u_UnitPixels", Laya.ShaderDataType.Float);
            {
                Particle2DShader.ColorOverLifetimeDef = Laya.Shader3D.getDefineByName("COLOROVERLIFETIME");
                Particle2DShader.ColorOverLifetimeRandom = Laya.Shader3D.getDefineByName("COLOROVERLIFETIME_RANDOM");
                Particle2DShader.ColorOVerLifetimeColorKey_8 = Laya.Shader3D.getDefineByName("COLOROVERLIFETIME_COLORKEY_8");
                Particle2DShader.GradientRGB = addUniformArray("u_GradientRGB", Laya.ShaderDataType.Vector4, 8);
                Particle2DShader.GradientAlpha = addUniformArray("u_GradientAlpha", Laya.ShaderDataType.Vector4, 4);
                Particle2DShader.GradientTimeRange = addUniform("u_GradientTimeRange", Laya.ShaderDataType.Vector4);
                Particle2DShader.GradientMaxRGB = addUniformArray("u_GradientMaxRGB", Laya.ShaderDataType.Vector4, 8);
                Particle2DShader.GradientMaxAlpha = addUniformArray("u_GradientMaxAlpha", Laya.ShaderDataType.Vector4, 4);
                Particle2DShader.GradientMaxTimeRange = addUniform("u_GradientMaxTimeRange", Laya.ShaderDataType.Vector4);
            }
            {
                Particle2DShader.VelocityOverLifetimeDef = Laya.Shader3D.getDefineByName("VELOCITYOVERLIFETIME");
                Particle2DShader.VelocityCurveMinX = addUniformArray("u_VelocityCurveMinX", Laya.ShaderDataType.Vector4, 2);
                Particle2DShader.VelocityCurveMinY = addUniformArray("u_VelocityCurveMinY", Laya.ShaderDataType.Vector4, 2);
                Particle2DShader.VelocityCurveMaxX = addUniformArray("u_VelocityCurveMaxX", Laya.ShaderDataType.Vector4, 2);
                Particle2DShader.VelocityCurveMaxY = addUniformArray("u_VelocityCurveMaxY", Laya.ShaderDataType.Vector4, 2);
                Particle2DShader.VelocityOverLifetimeSpace = addUniform("u_VelocityOverLifetimeSpace", Laya.ShaderDataType.Float);
            }
            {
                Particle2DShader.SizeOverLifetimeDef = Laya.Shader3D.getDefineByName("SIZEOVERLIFETIME");
                Particle2DShader.SizeCurveMinX = addUniformArray("u_SizeCurveMinX", Laya.ShaderDataType.Vector4, 2);
                Particle2DShader.SizeCurveMinY = addUniformArray("u_SizeCurveMinY", Laya.ShaderDataType.Vector4, 2);
                Particle2DShader.SizeCurveMinTimeRange = addUniform("u_SizeCurveMinTimeRange", Laya.ShaderDataType.Vector4);
                Particle2DShader.SizeCurveMaxX = addUniformArray("u_SizeCurveMaxX", Laya.ShaderDataType.Vector4, 2);
                Particle2DShader.SizeCurveMaxY = addUniformArray("u_SizeCurveMaxY", Laya.ShaderDataType.Vector4, 2);
                Particle2DShader.SizeCurveMaxTimeRange = addUniform("u_SizeCurveMaxTimeRange", Laya.ShaderDataType.Vector4);
            }
            {
                Particle2DShader.RotationOverLifetimeDef = Laya.Shader3D.getDefineByName("ROTATIONOVERLIFETIME");
                Particle2DShader.RotationCurveMin = addUniformArray("u_RotationCurveMin", Laya.ShaderDataType.Vector4, 2);
                Particle2DShader.RotationCurveMax = addUniformArray("u_RotationCurveMax", Laya.ShaderDataType.Vector4, 2);
            }
            {
                Particle2DShader.TextureSheetAnimationDef = Laya.Shader3D.getDefineByName("TEXTURESHEETANIMATION");
                Particle2DShader.TextureSheetFrameData = addUniform("u_TextureSheetFrameData", Laya.ShaderDataType.Vector4);
                Particle2DShader.TextureSheetFrame = addUniformArray("u_TextureSheetFrame", Laya.ShaderDataType.Vector4, 2);
                Particle2DShader.TextureSheetFrameMax = addUniformArray("u_TextureSheetFrameMax", Laya.ShaderDataType.Vector4, 2);
                Particle2DShader.TextureSheetFrameRange = addUniform("u_TextureSheetFrameRange", Laya.ShaderDataType.Vector4);
            }
        }
    }

    exports.Particle2DVertex = void 0;
    (function (Particle2DVertex) {
        Particle2DVertex[Particle2DVertex["PositionAndUV"] = 0] = "PositionAndUV";
        Particle2DVertex[Particle2DVertex["SheetFrameData"] = 7] = "SheetFrameData";
        Particle2DVertex[Particle2DVertex["DirectionAndPosition"] = 8] = "DirectionAndPosition";
        Particle2DVertex[Particle2DVertex["SizeAndTimes"] = 9] = "SizeAndTimes";
        Particle2DVertex[Particle2DVertex["SpeedSpaceAndRot"] = 10] = "SpeedSpaceAndRot";
        Particle2DVertex[Particle2DVertex["StartColor"] = 11] = "StartColor";
        Particle2DVertex[Particle2DVertex["RotationAndScale"] = 12] = "RotationAndScale";
        Particle2DVertex[Particle2DVertex["TransAndGravity"] = 13] = "TransAndGravity";
        Particle2DVertex[Particle2DVertex["Random0"] = 14] = "Random0";
        Particle2DVertex[Particle2DVertex["Random1"] = 15] = "Random1";
    })(exports.Particle2DVertex || (exports.Particle2DVertex = {}));
    class Particle2D {
        constructor() {
            let particleStride = Particle2DVertexMesh.Particle2DDeclaration.vertexStride;
            let buffer = new ArrayBuffer(particleStride);
            this.data = new Float32Array(buffer);
        }
        setDirection(x, y) {
            this.data[0] = x;
            this.data[1] = y;
        }
        setPosition(x, y) {
            this.data[2] = x;
            this.data[3] = y;
        }
        setSize(x, y) {
            this.data[4] = x;
            this.data[5] = y;
        }
        setEmitTime(emitTime) {
            this.data[6] = emitTime;
        }
        setLifetime(lifetime) {
            this.data[7] = lifetime;
        }
        setSpeed(speed) {
            this.data[8] = speed;
        }
        setSimulationSpace(space) {
            this.data[9] = space;
        }
        setRot(cos, sin) {
            this.data[10] = cos;
            this.data[11] = sin;
        }
        setColor(r, g, b, a) {
            this.data[12] = r;
            this.data[13] = g;
            this.data[14] = b;
            this.data[15] = a;
        }
        setSpriteRotAndScale(x, y, z, w) {
            this.data[16] = x;
            this.data[17] = y;
            this.data[18] = z;
            this.data[19] = w;
        }
        setSpriteTrans(x, y) {
            this.data[20] = x;
            this.data[21] = y;
        }
        setGravity(gravityX, gravityY) {
            this.data[22] = gravityX;
            this.data[23] = gravityY;
        }
        setRandom(x, y, z, w) {
            this.data[24] = x;
            this.data[25] = y;
            this.data[26] = z;
            this.data[27] = w;
        }
        setRandom1(x, y, z, w) {
            this.data[28] = x;
            this.data[29] = y;
            this.data[30] = z;
            this.data[31] = w;
        }
        setSheetFrameData(x, y, z, w) {
            this.data[32] = x;
            this.data[33] = y;
            this.data[34] = z;
            this.data[35] = w;
        }
    }
    class Particle2DVertexMesh {
        static init() {
            let particle2DElements = [
                {
                    usage: exports.Particle2DVertex.DirectionAndPosition,
                    format: Laya.VertexElementFormat.Vector4
                },
                {
                    usage: exports.Particle2DVertex.SizeAndTimes,
                    format: Laya.VertexElementFormat.Vector4
                },
                {
                    usage: exports.Particle2DVertex.SpeedSpaceAndRot,
                    format: Laya.VertexElementFormat.Vector4
                },
                {
                    usage: exports.Particle2DVertex.StartColor,
                    format: Laya.VertexElementFormat.Vector4
                },
                {
                    usage: exports.Particle2DVertex.RotationAndScale,
                    format: Laya.VertexElementFormat.Vector4
                },
                {
                    usage: exports.Particle2DVertex.TransAndGravity,
                    format: Laya.VertexElementFormat.Vector4
                },
                {
                    usage: exports.Particle2DVertex.Random0,
                    format: Laya.VertexElementFormat.Vector4
                },
                {
                    usage: exports.Particle2DVertex.Random1,
                    format: Laya.VertexElementFormat.Vector4
                },
                {
                    usage: exports.Particle2DVertex.SheetFrameData,
                    format: Laya.VertexElementFormat.Vector4
                }
            ];
            Particle2DVertexMesh.Particle2DDeclaration = createVertexVertexDeclaration(particle2DElements);
            let particle2DMeshElements = [
                {
                    usage: exports.Particle2DVertex.PositionAndUV,
                    format: Laya.VertexElementFormat.Vector4
                },
            ];
            Particle2DVertexMesh.Particle2DMeshDeclaration = createVertexVertexDeclaration(particle2DMeshElements);
            Particle2DVertexMesh.TempParticle2D = new Particle2D();
            let particleInfo = Particle2DVertexMesh.Particle2DInfo = new Laya.ParticleInfo();
            let declaration = Particle2DVertexMesh.Particle2DDeclaration;
            particleInfo.timeIndex = declaration.getVertexElementByUsage(exports.Particle2DVertex.SizeAndTimes).offset / 4 + 2;
            particleInfo.lifetimeIndex = declaration.getVertexElementByUsage(exports.Particle2DVertex.SizeAndTimes).offset / 4 + 3;
        }
    }
    function getVertexFormatStride(format) {
        switch (format) {
            case Laya.VertexElementFormat.Vector4:
                return 16;
            case Laya.VertexElementFormat.Vector3:
                return 12;
            case Laya.VertexElementFormat.Vector2:
                return 8;
            default:
                throw new Error("Unkonw vertex format.");
        }
    }
    function createVertexVertexDeclaration(vertexElements) {
        let stride = 0;
        let elements = [];
        for (let i = 0; i < vertexElements.length; i++) {
            let element = vertexElements[i];
            let offset = stride;
            let elementStride = getVertexFormatStride(element.format);
            if (elementStride > 0) {
                elements.push(new Laya.VertexElement(offset, element.format, element.usage));
                stride += elementStride;
            }
        }
        return new Laya.VertexDeclaration(stride, elements);
    }

    const _globalPoint = new Laya.Point();
    exports.Particle2DSystemDirtyFlagBits = void 0;
    (function (Particle2DSystemDirtyFlagBits) {
        Particle2DSystemDirtyFlagBits[Particle2DSystemDirtyFlagBits["Velocity2DOverLifetimeBit"] = 1] = "Velocity2DOverLifetimeBit";
        Particle2DSystemDirtyFlagBits[Particle2DSystemDirtyFlagBits["ColorOverLifetimeBit"] = 2] = "ColorOverLifetimeBit";
        Particle2DSystemDirtyFlagBits[Particle2DSystemDirtyFlagBits["Size2DOverLifetimeBit"] = 4] = "Size2DOverLifetimeBit";
        Particle2DSystemDirtyFlagBits[Particle2DSystemDirtyFlagBits["Rotation2DOverLifetimeBit"] = 8] = "Rotation2DOverLifetimeBit";
        Particle2DSystemDirtyFlagBits[Particle2DSystemDirtyFlagBits["TextureSheetAnimationBit"] = 16] = "TextureSheetAnimationBit";
    })(exports.Particle2DSystemDirtyFlagBits || (exports.Particle2DSystemDirtyFlagBits = {}));
    class ShurikenParticle2DSystem extends Laya.ParticleControler {
        get main() {
            return this._main;
        }
        get emission() {
            return this._emission;
        }
        get velocity2DOverLifetime() {
            return this._velocity2DOverLifetime;
        }
        set velocity2DOverLifetime(value) {
            this._velocity2DOverLifetime = value;
            this._dirtyFlags |= exports.Particle2DSystemDirtyFlagBits.Velocity2DOverLifetimeBit;
        }
        get colorOverLifetime() {
            return this._colorOverLifetime;
        }
        set colorOverLifetime(value) {
            this._colorOverLifetime = value;
            this._dirtyFlags |= exports.Particle2DSystemDirtyFlagBits.ColorOverLifetimeBit;
        }
        get size2DOverLifetime() {
            return this._size2DOverLifetime;
        }
        set size2DOverLifetime(value) {
            this._size2DOverLifetime = value;
            this._dirtyFlags |= exports.Particle2DSystemDirtyFlagBits.Size2DOverLifetimeBit;
        }
        get rotation2DOverLifetime() {
            return this._rotation2DOverLifetime;
        }
        set rotation2DOverLifetime(value) {
            this._rotation2DOverLifetime = value;
            this._dirtyFlags |= exports.Particle2DSystemDirtyFlagBits.Rotation2DOverLifetimeBit;
        }
        get textureSheetAnimation() {
            return this._textureSheetAnimation;
        }
        set textureSheetAnimation(value) {
            this._textureSheetAnimation = value;
            this._dirtyFlags |= exports.Particle2DSystemDirtyFlagBits.TextureSheetAnimationBit;
        }
        _initParticleData(particleByteStride, particleInfo) {
            let maxparticles = this.main.maxParticles;
            this._initParticlePool(maxparticles, particleByteStride, particleInfo);
        }
        constructor() {
            super();
            this._dirtyFlags = ~0;
            this._main = new Main2DModule();
            this._emission = new Laya.EmissionModule();
            this._dirtyFlags = ~0;
        }
        play() {
            super.play();
            let globalPoint = _globalPoint;
            this.owner.globalTrans.getPos(globalPoint);
            this.emission._lastPosition.setValue(globalPoint.x, globalPoint.y, 0);
        }
        getPositionAndDirection() {
            if (this.shape && this.shape.enable && this.shape.shape) {
                return this.shape.shape.getPositionAndDirection();
            }
            else {
                return Laya.Vector4.UnitW;
            }
        }
        _emit(emitTime, age) {
            if (this.particlePool.activeParticleCount >= this.main.maxParticles) {
                return false;
            }
            const main = this.main;
            let particle = Particle2DVertexMesh.TempParticle2D;
            let duration = main.duration;
            let normalizedTime = this.time / duration;
            let lifetimeRandom = curveNeedRandom(main.startLifetime.mode) ? Math.random() : 0;
            let lifetime = main.startLifetime.evaluate(normalizedTime, lifetimeRandom);
            let startDelayRandom = curveNeedRandom(main.startDelay.mode) ? Math.random() : 0;
            let startDelay = main.startDelay.evaluate(normalizedTime, startDelayRandom);
            let startSpeedRandom = curveNeedRandom(main.startSpeed.mode) ? Math.random() : 0;
            let startSpeed = main.startSpeed.evaluate(normalizedTime, startSpeedRandom);
            let startSizeXRandom = curveNeedRandom(main.startSizeX.mode) ? Math.random() : 0;
            let startSizeX = main.startSizeX.evaluate(normalizedTime, startSizeXRandom);
            let startSizeY = startSizeX;
            if (main.startSize2D) {
                let startSizeYRandom = curveNeedRandom(main.startSizeY.mode) ? Math.random() : 0;
                startSizeY = main.startSizeY.evaluate(normalizedTime, startSizeYRandom);
            }
            let startRotationRandom = curveNeedRandom(main.startRotation.mode) ? Math.random() : 0;
            let startRotation = main.startRotation.evaluate(normalizedTime, startRotationRandom);
            let startRadians = -startRotation * Math.PI / 180;
            particle.setEmitTime(emitTime + startDelay);
            particle.setLifetime(lifetime);
            let startPosAndDir = this.getPositionAndDirection();
            particle.setPosition(startPosAndDir.x, startPosAndDir.y);
            particle.setDirection(startPosAndDir.z, startPosAndDir.w);
            particle.setSize(startSizeX, startSizeY);
            particle.setSpeed(startSpeed);
            particle.setGravity(main._gravity.x, main._gravity.y);
            particle.setRot(Math.cos(startRadians), Math.sin(startRadians));
            let colorOverLifetimeRandom = 0;
            if (this.colorOverLifetime && this.colorOverLifetime.enable) {
                let color = this.colorOverLifetime.color;
                switch (color.mode) {
                    case Laya.ParticleMinMaxGradientMode.TwoGradients:
                        colorOverLifetimeRandom = Math.random();
                        break;
                }
            }
            let velocityOverLifetimeRandomX = 0;
            let velocityOverLifetimeRandomY = 0;
            if (this.velocity2DOverLifetime && this.velocity2DOverLifetime.enable) {
                let mode = this.velocity2DOverLifetime.x.mode;
                switch (mode) {
                    case Laya.ParticleMinMaxCurveMode.TwoConstants:
                    case Laya.ParticleMinMaxCurveMode.TwoCurves:
                        velocityOverLifetimeRandomX = Math.random();
                        velocityOverLifetimeRandomY = Math.random();
                        break;
                }
            }
            let rotation2DOverLifetimeRandom = 0;
            if (this.rotation2DOverLifetime && this.rotation2DOverLifetime.enable) {
                let mode = this.rotation2DOverLifetime.angularVelocity.mode;
                switch (mode) {
                    case Laya.ParticleMinMaxCurveMode.TwoConstants:
                    case Laya.ParticleMinMaxCurveMode.TwoCurves:
                        rotation2DOverLifetimeRandom = Math.random();
                        break;
                }
            }
            particle.setRandom(colorOverLifetimeRandom, velocityOverLifetimeRandomX, velocityOverLifetimeRandomY, rotation2DOverLifetimeRandom);
            let sizeOverLifetimeRandomX = 0;
            let sizeOverLifetimeRandomY = 0;
            if (this.size2DOverLifetime && this.size2DOverLifetime.enable) {
                let mode = this.size2DOverLifetime.size.mode;
                switch (mode) {
                    case Laya.ParticleMinMaxCurveMode.Constant:
                        {
                            if (this.size2DOverLifetime.separateAxes) {
                                let sizeX = this.size2DOverLifetime.x.constant;
                                let sizeY = this.size2DOverLifetime.y.constant;
                                particle.setSize(startSizeX * sizeX, startSizeY * sizeY);
                            }
                            else {
                                let size = this.size2DOverLifetime.size.constant;
                                particle.setSize(startSizeX * size, startSizeY * size);
                            }
                            break;
                        }
                    case Laya.ParticleMinMaxCurveMode.TwoConstants:
                        {
                            if (this.size2DOverLifetime.separateAxes) {
                                let sizeMinX = this.size2DOverLifetime.x.constantMin;
                                let sizeMinY = this.size2DOverLifetime.y.constantMin;
                                let sizeMaxX = this.size2DOverLifetime.x.constantMax;
                                let sizeMaxY = this.size2DOverLifetime.y.constantMax;
                                let sizeX = sizeMinX + Math.random() * (sizeMaxX - sizeMinX);
                                let sizeY = sizeMinY + Math.random() * (sizeMaxY - sizeMinY);
                                particle.setSize(startSizeX * sizeX, startSizeY * sizeY);
                            }
                            else {
                                let sizeMin = this.size2DOverLifetime.size.constantMin;
                                let sizeMax = this.size2DOverLifetime.size.constantMax;
                                let size = sizeMin + Math.random() * (sizeMax - sizeMin);
                                particle.setSize(startSizeX * size, startSizeY * size);
                            }
                            break;
                        }
                    case Laya.ParticleMinMaxCurveMode.TwoCurves:
                        if (this.size2DOverLifetime.separateAxes) {
                            sizeOverLifetimeRandomX = Math.random();
                            sizeOverLifetimeRandomY = Math.random();
                        }
                        else {
                            sizeOverLifetimeRandomX = sizeOverLifetimeRandomY = Math.random();
                        }
                        break;
                }
            }
            let textureSheetAnimationRandom = 0;
            if (this.textureSheetAnimation && this.textureSheetAnimation.enable) {
                let frame = this.textureSheetAnimation.frame;
                let mode = frame.mode;
                switch (mode) {
                    case Laya.ParticleMinMaxCurveMode.TwoConstants:
                    case Laya.ParticleMinMaxCurveMode.TwoCurves:
                        textureSheetAnimationRandom = Math.random();
                        break;
                }
            }
            particle.setRandom1(sizeOverLifetimeRandomX, sizeOverLifetimeRandomY, textureSheetAnimationRandom, 0);
            let spriteRotAndScale = main._spriteRotAndScale;
            particle.setSpriteRotAndScale(spriteRotAndScale.x, spriteRotAndScale.y, spriteRotAndScale.z, spriteRotAndScale.w);
            let spriteTransAndSpace = main._spriteTranslateAndSpace;
            particle.setSpriteTrans(spriteTransAndSpace.x, spriteTransAndSpace.y);
            particle.setSimulationSpace(spriteTransAndSpace.z);
            let startColorRandom = gradientNeedRandom(main.startColor.mode) ? Math.random() : 0;
            let color = main.startColor.evaluate(normalizedTime, startColorRandom);
            particle.setColor(color.r, color.g, color.b, color.a);
            if (this.textureSheetAnimation && this.textureSheetAnimation.enable) {
                this.textureSheetAnimation._calculateSheetFrameData();
                let sheetFrameData = this.textureSheetAnimation._sheetFrameData;
                particle.setSheetFrameData(sheetFrameData.x, sheetFrameData.y, sheetFrameData.z, sheetFrameData.w);
            }
            this.particlePool.addParticleData(particle.data);
            return true;
        }
        _emitOverTime(elapsedTime) {
            let currentTime = this.totalTime;
            let lastEmitTime = this._lastEmitTime;
            let duration = currentTime - lastEmitTime;
            let emissionInterval = this.emission._emissionInterval;
            if (duration >= emissionInterval) {
                let count = Math.floor(duration / emissionInterval);
                for (let i = 1; i <= count; i++) {
                    let emitTime = i * emissionInterval + lastEmitTime;
                    let age = currentTime - emitTime;
                    this._emit(emitTime, age);
                    this._lastEmitTime = emitTime;
                }
            }
        }
        _emitOverDistance() {
            let emission = this.emission;
            if (emission.rateOverDistance <= 0) {
                return;
            }
            let pxielDistance = 1 / emission.rateOverDistance * this.main.unitPixels;
            if (this._emitDistance >= pxielDistance) {
                let count = Math.floor(this._emitDistance / pxielDistance);
                for (let i = 1; i <= count; i++) {
                    let emitTime = this.totalTime;
                    let age = 0;
                    this._emit(emitTime, age);
                    this._emitDistance -= pxielDistance;
                }
            }
        }
        _emitBurst(burst, emitTime) {
            burst.time;
            let count = burst.count;
            let age = this.totalTime - emitTime;
            for (let j = 0; j < count; j++) {
                if (!this._emit(emitTime, age)) {
                    break;
                }
            }
        }
        _emitBursts() {
            let bursts = this.emission._sortedBursts;
            let count = bursts ? bursts.length : 0;
            let duration = this.main.duration;
            let start = this._nextBurstIndex;
            for (let i = start; i < count; i++) {
                let burst = bursts[i];
                if (burst.time > duration) {
                    break;
                }
                let burstTime = this._burstLoopCount * duration + burst.time;
                if (burstTime <= this.totalTime) {
                    this._emitBurst(burst, burstTime);
                    this._nextBurstIndex = i + 1;
                    if (this._nextBurstIndex >= count) {
                        this._nextBurstIndex = (i + 1) % count;
                        this._burstLoopCount++;
                    }
                }
            }
        }
        _update(deltaTime) {
            if (this.isPlaying) {
                {
                    let simulationSpeed = this.main.simulationSpeed;
                    deltaTime *= simulationSpeed;
                }
                if (deltaTime <= 0) {
                    return;
                }
                this.time += deltaTime;
                this.totalTime += deltaTime;
                if (this.time >= this.main.duration) {
                    if (this.main.looping) {
                        this.time -= this.main.duration;
                    }
                    else {
                        this._isEmitting = false;
                        if (this.particlePool.activeParticleCount <= 0) {
                            this.stop();
                        }
                    }
                }
                this.particlePool.retireParticles(this.totalTime);
                if (this.emission.enable && this.isEmitting) {
                    this._emitOverTime(deltaTime);
                    this._emitOverDistance();
                    this._emitBursts();
                }
            }
        }
        simulate(time, restart = true) {
            if (this.isPlaying) {
                if (restart) {
                    this.stop();
                    this.play();
                }
                this._update(time);
                this.pause();
            }
        }
        cloneTo(destObject) {
            this.main.cloneTo(destObject.main);
            this.emission.cloneTo(destObject.emission);
            this.shape.cloneTo(destObject.shape);
            this.velocity2DOverLifetime.cloneTo(destObject.velocity2DOverLifetime);
            this.colorOverLifetime.cloneTo(destObject.colorOverLifetime);
            this.size2DOverLifetime.cloneTo(destObject.size2DOverLifetime);
            this.rotation2DOverLifetime.cloneTo(destObject.rotation2DOverLifetime);
            this.textureSheetAnimation.cloneTo(destObject.textureSheetAnimation);
        }
        clone() {
            let dest = new ShurikenParticle2DSystem();
            this.cloneTo(dest);
            return dest;
        }
        destroy() {
            super.destroy();
            if (this.particlePool) {
                this.particlePool.destroy();
                this.particlePool = null;
            }
        }
    }
    function curveNeedRandom(mode) {
        switch (mode) {
            case Laya.ParticleMinMaxCurveMode.TwoConstants:
            case Laya.ParticleMinMaxCurveMode.TwoCurves:
                return true;
            default:
                return false;
        }
    }
    function gradientNeedRandom(mode) {
        switch (mode) {
            case Laya.ParticleMinMaxGradientMode.TwoColors:
            case Laya.ParticleMinMaxGradientMode.TwoGradients:
                return true;
            default:
                return false;
        }
    }

    const nMatrix0 = new Laya.Vector3();
    const nMatrix1 = new Laya.Vector3();
    const tempV4 = new Laya.Vector4();
    const fillGradientRGB = (gradient, buffer) => {
        let count = Math.min(gradient.colorRGBKeysCount, 8);
        if (count == 1) {
            gradient._rgbElements[0];
            let r = gradient._rgbElements[1];
            let g = gradient._rgbElements[2];
            let b = gradient._rgbElements[3];
            buffer[0] = 0;
            buffer[1] = r;
            buffer[2] = g;
            buffer[3] = b;
            buffer[4] = 1;
            buffer[5] = r;
            buffer[6] = g;
            buffer[7] = b;
        }
        else {
            let length = Math.min(gradient._rgbElements.length, 8 * 4);
            let data = new Float32Array(gradient._rgbElements.buffer, 0, length);
            buffer.set(data);
        }
        if (count <= 4) {
            return new Float32Array(buffer.buffer, 0, 4 * 4);
        }
        else {
            return buffer;
        }
    };
    const fillGradientAlpha = (gradient, buffer) => {
        let count = Math.min(gradient.colorAlphaKeysCount, 8);
        if (count == 1) {
            gradient._alphaElements[0];
            let a = gradient._alphaElements[1];
            buffer[0] = 0;
            buffer[1] = a;
            buffer[2] = 1;
            buffer[3] = a;
        }
        else {
            let length = Math.min(gradient._alphaElements.length, 8 * 2);
            let data = new Float32Array(gradient._alphaElements.buffer, 0, length);
            buffer.set(data);
        }
        if (count <= 4) {
            return new Float32Array(buffer.buffer, 0, 4 * 2);
        }
        else {
            return buffer;
        }
    };
    const fillGradientTimeRange = (gradient, range, maxCount) => {
        let colorMinTime = 0;
        let colorMaxTime = 1;
        let count = Math.min(gradient.colorRGBKeysCount, maxCount);
        if (count == 1) {
            colorMinTime = 0;
            colorMaxTime = 1;
        }
        else {
            colorMinTime = 1;
            colorMaxTime = 0;
            for (let i = 0; i < count; i++) {
                let time = gradient._rgbElements[i * 4];
                colorMinTime = Math.min(colorMinTime, time);
                colorMaxTime = Math.max(colorMaxTime, time);
            }
        }
        let alphaMinTime = 0;
        let alphaMaxTime = 1;
        count = Math.min(gradient.colorAlphaKeysCount, maxCount);
        if (count == 1) {
            alphaMinTime = 0;
            alphaMaxTime = 1;
        }
        else {
            alphaMinTime = 1;
            alphaMaxTime = 0;
            for (let i = 0; i < count; i++) {
                let time = gradient._alphaElements[i * 2];
                alphaMinTime = Math.min(alphaMinTime, time);
                alphaMaxTime = Math.max(alphaMaxTime, time);
            }
        }
        range.setValue(colorMinTime, colorMaxTime, alphaMinTime, alphaMaxTime);
    };
    const fillCurveMinMaxTimeRange = (curve0, curve1, range) => {
        let curve0MinTime = 1;
        let curve0MaxTime = 0;
        let count = Math.min(curve0.gradientCount, 4);
        if (count == 1) {
            curve0MinTime = 0;
            curve0MaxTime = 1;
        }
        else {
            let lastTime = curve0.getKeyByIndex(0);
            curve0MinTime = Math.min(curve0MinTime, lastTime);
            curve0MaxTime = Math.max(curve0MaxTime, lastTime);
            for (let i = 1; i < count; i++) {
                let time = curve0.getKeyByIndex(i);
                if (time > lastTime) {
                    curve0MinTime = Math.min(curve0MinTime, time);
                    curve0MaxTime = Math.max(curve0MaxTime, time);
                    lastTime = time;
                }
            }
        }
        let curve1MinTime = 1;
        let curve1MaxTime = 0;
        count = Math.min(curve1.gradientCount, 4);
        if (count == 1) {
            curve1MinTime = 0;
            curve1MaxTime = 1;
        }
        else {
            let lastTime = curve1.getKeyByIndex(0);
            curve1MinTime = Math.min(curve1MinTime, lastTime);
            curve1MaxTime = Math.max(curve1MaxTime, lastTime);
            for (let i = 1; i < count; i++) {
                let time = curve1.getKeyByIndex(i);
                if (time > lastTime) {
                    curve1MinTime = Math.min(curve1MinTime, time);
                    curve1MaxTime = Math.max(curve1MaxTime, time);
                    lastTime = time;
                }
            }
        }
        range.setValue(curve0MinTime, curve0MaxTime, curve1MinTime, curve1MaxTime);
    };
    const fillParticleData = (particleIndex, particleStride, particleByteStride, particleDatas, meshVertexCount, particleVertexDatas) => {
        let particleDataOffset = particleIndex * particleByteStride;
        let particleData = new Float32Array(particleDatas.buffer, particleDataOffset, particleStride);
        for (let j = 0; j < meshVertexCount; j++) {
            let vertexOffset = (particleIndex * meshVertexCount + j) * particleStride;
            particleVertexDatas.set(particleData, vertexOffset);
        }
    };
    function gradientDataNumberConstant(gradient, value) {
        gradient._elements.fill(0);
        gradient._elements[0] = 0;
        gradient._elements[1] = value;
        gradient._elements[2] = 1;
        gradient._elements[3] = value;
    }
    class ShurikenParticle2DRenderer extends Laya.BaseRenderNode2D {
        get particleSystem() {
            return this._particleSystem;
        }
        _setOwner(node) {
            super._setOwner(node);
            this.particleSystem.owner = node;
        }
        get sharedMaterial() {
            return super.sharedMaterial;
        }
        set sharedMaterial(value) {
            super.sharedMaterial = value;
            this._createRenderElements();
        }
        constructor() {
            super();
            this._gradientRGBBuffer = new Float32Array(8 * 4);
            this._gradientAlphaBuffer = new Float32Array(8 * 2);
            this._gradientTimeRange = new Laya.Vector4();
            this._gradientMaxRGBBuffer = new Float32Array(8 * 4);
            this._gradientMaxAlphaBuffer = new Float32Array(8 * 2);
            this._gradientMaxTimeRange = new Laya.Vector4();
            this._updateMark = -1;
            this._renderElements = [];
            this._materials = [];
            this._particleSystem = new ShurikenParticle2DSystem();
        }
        _getcommonUniformMap() {
            return ["BaseRender2D", "_Particle2D"];
        }
        setParticleColorOverLifetime(shaderData) {
            let ps = this.particleSystem;
            if (ps.colorOverLifetime && ps.colorOverLifetime.enable) {
                shaderData.addDefine(Particle2DShader.ColorOverLifetimeDef);
                let color = ps.colorOverLifetime.color;
                let gradientMin = color.gradientMin;
                let gradientMax = color.gradientMax;
                let mode = color.mode;
                let rgbMinBuffer = fillGradientRGB(gradientMin, this._gradientRGBBuffer);
                let alphaMinBuffer = fillGradientAlpha(gradientMin, this._gradientAlphaBuffer);
                let colorKey8 = false;
                if (rgbMinBuffer.length == 32 || alphaMinBuffer.length == 16) {
                    colorKey8 = true;
                    fillGradientTimeRange(gradientMin, this._gradientTimeRange, 8);
                }
                else {
                    fillGradientTimeRange(gradientMin, this._gradientTimeRange, 4);
                }
                shaderData.setVector(Particle2DShader.GradientTimeRange, this._gradientTimeRange);
                let rgbMaxBuffer;
                let alphaMaxBuffer;
                switch (mode) {
                    case Laya.ParticleMinMaxGradientMode.Gradient:
                        shaderData.removeDefine(Particle2DShader.ColorOverLifetimeRandom);
                        break;
                    case Laya.ParticleMinMaxGradientMode.TwoGradients: {
                        shaderData.addDefine(Particle2DShader.ColorOverLifetimeRandom);
                        rgbMaxBuffer = fillGradientRGB(gradientMax, this._gradientMaxRGBBuffer);
                        alphaMaxBuffer = fillGradientAlpha(gradientMax, this._gradientMaxAlphaBuffer);
                        if (rgbMaxBuffer.length == 32 || alphaMaxBuffer.length == 16) {
                            colorKey8 = true;
                            shaderData.setBuffer(Particle2DShader.GradientMaxRGB, this._gradientMaxRGBBuffer);
                            shaderData.setBuffer(Particle2DShader.GradientMaxAlpha, this._gradientMaxAlphaBuffer);
                            fillGradientTimeRange(gradientMax, this._gradientMaxTimeRange, 8);
                        }
                        else {
                            shaderData.setBuffer(Particle2DShader.GradientMaxRGB, rgbMaxBuffer);
                            shaderData.setBuffer(Particle2DShader.GradientMaxAlpha, alphaMaxBuffer);
                            fillGradientTimeRange(gradientMax, this._gradientMaxTimeRange, 4);
                        }
                        shaderData.setVector(Particle2DShader.GradientMaxTimeRange, this._gradientMaxTimeRange);
                        break;
                    }
                }
                if (colorKey8) {
                    shaderData.addDefine(Particle2DShader.ColorOVerLifetimeColorKey_8);
                    shaderData.setBuffer(Particle2DShader.GradientRGB, this._gradientRGBBuffer);
                    shaderData.setBuffer(Particle2DShader.GradientAlpha, this._gradientAlphaBuffer);
                }
                else {
                    shaderData.setBuffer(Particle2DShader.GradientRGB, rgbMinBuffer);
                    shaderData.setBuffer(Particle2DShader.GradientAlpha, alphaMinBuffer);
                }
            }
            else {
                shaderData.removeDefine(Particle2DShader.ColorOverLifetimeDef);
                shaderData.removeDefine(Particle2DShader.ColorOverLifetimeRandom);
                shaderData.removeDefine(Particle2DShader.ColorOVerLifetimeColorKey_8);
            }
        }
        setParticleVelocityOverLifetime(shaderData) {
            let ps = this.particleSystem;
            if (ps.velocity2DOverLifetime && ps.velocity2DOverLifetime.enable) {
                shaderData.addDefine(Particle2DShader.VelocityOverLifetimeDef);
                let velocityX = ps.velocity2DOverLifetime.x;
                let velocityY = ps.velocity2DOverLifetime.y;
                let mode = velocityX.mode;
                switch (mode) {
                    case Laya.ParticleMinMaxCurveMode.Constant:
                        {
                            let valueX = velocityX.constant;
                            let valueY = velocityY.constant;
                            gradientDataNumberConstant(velocityX.curve, valueX);
                            gradientDataNumberConstant(velocityY.curve, valueY);
                            shaderData.setBuffer(Particle2DShader.VelocityCurveMinX, velocityX.curve._elements);
                            shaderData.setBuffer(Particle2DShader.VelocityCurveMinY, velocityY.curve._elements);
                            shaderData.setBuffer(Particle2DShader.VelocityCurveMaxX, velocityX.curve._elements);
                            shaderData.setBuffer(Particle2DShader.VelocityCurveMaxY, velocityY.curve._elements);
                            break;
                        }
                    case Laya.ParticleMinMaxCurveMode.TwoConstants:
                        {
                            let valueMinX = velocityX.constantMin;
                            let valueMinY = velocityY.constantMin;
                            let valueMaxX = velocityX.constantMax;
                            let valueMaxY = velocityY.constantMax;
                            gradientDataNumberConstant(velocityX.curveMin, valueMinX);
                            gradientDataNumberConstant(velocityY.curveMin, valueMinY);
                            gradientDataNumberConstant(velocityX.curveMax, valueMaxX);
                            gradientDataNumberConstant(velocityY.curveMax, valueMaxY);
                            shaderData.setBuffer(Particle2DShader.VelocityCurveMinX, velocityX.curveMin._elements);
                            shaderData.setBuffer(Particle2DShader.VelocityCurveMinY, velocityY.curveMin._elements);
                            shaderData.setBuffer(Particle2DShader.VelocityCurveMaxX, velocityX.curveMax._elements);
                            shaderData.setBuffer(Particle2DShader.VelocityCurveMaxY, velocityY.curveMax._elements);
                            break;
                        }
                    case Laya.ParticleMinMaxCurveMode.Curve:
                        {
                            velocityX.curve._formatData();
                            velocityY.curve._formatData();
                            shaderData.setBuffer(Particle2DShader.VelocityCurveMinX, velocityX.curve._elements);
                            shaderData.setBuffer(Particle2DShader.VelocityCurveMinY, velocityY.curve._elements);
                            shaderData.setBuffer(Particle2DShader.VelocityCurveMaxX, velocityX.curve._elements);
                            shaderData.setBuffer(Particle2DShader.VelocityCurveMaxY, velocityY.curve._elements);
                            break;
                        }
                    case Laya.ParticleMinMaxCurveMode.TwoCurves:
                        {
                            velocityX.curveMin._formatData();
                            velocityY.curveMin._formatData();
                            velocityX.curveMax._formatData();
                            velocityY.curveMax._formatData();
                            shaderData.setBuffer(Particle2DShader.VelocityCurveMinX, velocityX.curveMin._elements);
                            shaderData.setBuffer(Particle2DShader.VelocityCurveMinY, velocityY.curveMin._elements);
                            shaderData.setBuffer(Particle2DShader.VelocityCurveMaxX, velocityX.curveMax._elements);
                            shaderData.setBuffer(Particle2DShader.VelocityCurveMaxY, velocityY.curveMax._elements);
                            break;
                        }
                }
                let space = ps.velocity2DOverLifetime.space;
                switch (space) {
                    case exports.Velocity2DSimulateSpace.Local:
                        shaderData.setNumber(Particle2DShader.VelocityOverLifetimeSpace, 0);
                        break;
                    case exports.Velocity2DSimulateSpace.World:
                        shaderData.setNumber(Particle2DShader.VelocityOverLifetimeSpace, 1);
                        break;
                }
            }
            else {
                shaderData.removeDefine(Particle2DShader.VelocityOverLifetimeDef);
            }
        }
        setSize2DOverLifetime(shaderData) {
            let ps = this.particleSystem;
            if (ps.size2DOverLifetime && ps.size2DOverLifetime.enable) {
                let sizeX = ps.size2DOverLifetime.x;
                let sizeY = ps.size2DOverLifetime.y;
                let mode = sizeX.mode;
                switch (mode) {
                    case Laya.ParticleMinMaxCurveMode.Curve:
                        shaderData.addDefine(Particle2DShader.SizeOverLifetimeDef);
                        if (ps.size2DOverLifetime.separateAxes) {
                            sizeX.curve._formatData();
                            sizeY.curve._formatData();
                            shaderData.setBuffer(Particle2DShader.SizeCurveMinX, sizeX.curve._elements);
                            shaderData.setBuffer(Particle2DShader.SizeCurveMinY, sizeY.curve._elements);
                            shaderData.setBuffer(Particle2DShader.SizeCurveMaxX, sizeX.curve._elements);
                            shaderData.setBuffer(Particle2DShader.SizeCurveMaxY, sizeY.curve._elements);
                            let range = tempV4;
                            fillCurveMinMaxTimeRange(sizeX.curve, sizeY.curve, range);
                            shaderData.setVector(Particle2DShader.SizeCurveMinTimeRange, range);
                            shaderData.setVector(Particle2DShader.SizeCurveMaxTimeRange, range);
                        }
                        else {
                            sizeX.curve._formatData();
                            shaderData.setBuffer(Particle2DShader.SizeCurveMinX, sizeX.curve._elements);
                            shaderData.setBuffer(Particle2DShader.SizeCurveMinY, sizeX.curve._elements);
                            shaderData.setBuffer(Particle2DShader.SizeCurveMaxX, sizeX.curve._elements);
                            shaderData.setBuffer(Particle2DShader.SizeCurveMaxY, sizeX.curve._elements);
                            let range = tempV4;
                            fillCurveMinMaxTimeRange(sizeX.curve, sizeX.curve, range);
                            shaderData.setVector(Particle2DShader.SizeCurveMinTimeRange, range);
                            shaderData.setVector(Particle2DShader.SizeCurveMaxTimeRange, range);
                        }
                        break;
                    case Laya.ParticleMinMaxCurveMode.TwoCurves:
                        shaderData.addDefine(Particle2DShader.SizeOverLifetimeDef);
                        if (ps.size2DOverLifetime.separateAxes) {
                            sizeX.curveMin._formatData();
                            sizeX.curveMax._formatData();
                            sizeY.curveMin._formatData();
                            sizeX.curveMax._formatData();
                            shaderData.setBuffer(Particle2DShader.SizeCurveMinX, sizeX.curveMin._elements);
                            shaderData.setBuffer(Particle2DShader.SizeCurveMinY, sizeY.curveMin._elements);
                            shaderData.setBuffer(Particle2DShader.SizeCurveMaxX, sizeX.curveMax._elements);
                            shaderData.setBuffer(Particle2DShader.SizeCurveMaxY, sizeY.curveMax._elements);
                            let range = tempV4;
                            fillCurveMinMaxTimeRange(sizeX.curveMin, sizeY.curveMin, range);
                            shaderData.setVector(Particle2DShader.SizeCurveMinTimeRange, range);
                            fillCurveMinMaxTimeRange(sizeX.curveMax, sizeY.curveMax, range);
                            shaderData.setVector(Particle2DShader.SizeCurveMaxTimeRange, range);
                        }
                        else {
                            sizeX.curveMin._formatData();
                            sizeX.curveMax._formatData();
                            shaderData.setBuffer(Particle2DShader.SizeCurveMinX, sizeX.curveMin._elements);
                            shaderData.setBuffer(Particle2DShader.SizeCurveMinY, sizeX.curveMin._elements);
                            shaderData.setBuffer(Particle2DShader.SizeCurveMaxX, sizeX.curveMax._elements);
                            shaderData.setBuffer(Particle2DShader.SizeCurveMaxY, sizeX.curveMax._elements);
                            let range = tempV4;
                            fillCurveMinMaxTimeRange(sizeX.curveMin, sizeX.curveMin, range);
                            shaderData.setVector(Particle2DShader.SizeCurveMinTimeRange, range);
                            fillCurveMinMaxTimeRange(sizeX.curveMax, sizeX.curveMax, range);
                            shaderData.setVector(Particle2DShader.SizeCurveMaxTimeRange, range);
                        }
                        break;
                    case Laya.ParticleMinMaxCurveMode.Constant:
                    case Laya.ParticleMinMaxCurveMode.TwoConstants:
                    default:
                        shaderData.removeDefine(Particle2DShader.SizeOverLifetimeDef);
                        break;
                }
            }
            else {
                shaderData.removeDefine(Particle2DShader.SizeOverLifetimeDef);
            }
        }
        setRotationOverlifetime(shaderData) {
            let ps = this.particleSystem;
            if (ps.rotation2DOverLifetime && ps.rotation2DOverLifetime.enable) {
                shaderData.addDefine(Particle2DShader.RotationOverLifetimeDef);
                let angularVelocity = ps.rotation2DOverLifetime.angularVelocity;
                let mode = angularVelocity.mode;
                switch (mode) {
                    case Laya.ParticleMinMaxCurveMode.Constant:
                        {
                            let value = angularVelocity.constant;
                            gradientDataNumberConstant(angularVelocity.curve, value);
                            shaderData.setBuffer(Particle2DShader.RotationCurveMin, angularVelocity.curve._elements);
                            shaderData.setBuffer(Particle2DShader.RotationCurveMax, angularVelocity.curve._elements);
                            break;
                        }
                    case Laya.ParticleMinMaxCurveMode.Curve:
                        {
                            angularVelocity.curve._formatData();
                            shaderData.setBuffer(Particle2DShader.RotationCurveMin, angularVelocity.curve._elements);
                            shaderData.setBuffer(Particle2DShader.RotationCurveMax, angularVelocity.curve._elements);
                            break;
                        }
                    case Laya.ParticleMinMaxCurveMode.TwoConstants:
                        {
                            let valueMin = angularVelocity.constantMin;
                            let valueMax = angularVelocity.constantMax;
                            gradientDataNumberConstant(angularVelocity.curveMin, valueMin);
                            gradientDataNumberConstant(angularVelocity.curveMax, valueMax);
                            shaderData.setBuffer(Particle2DShader.RotationCurveMin, angularVelocity.curveMin._elements);
                            shaderData.setBuffer(Particle2DShader.RotationCurveMax, angularVelocity.curveMax._elements);
                            break;
                        }
                    case Laya.ParticleMinMaxCurveMode.TwoCurves:
                        {
                            angularVelocity.curveMin._formatData();
                            angularVelocity.curveMax._formatData();
                            shaderData.setBuffer(Particle2DShader.RotationCurveMin, angularVelocity.curveMin._elements);
                            shaderData.setBuffer(Particle2DShader.RotationCurveMax, angularVelocity.curveMax._elements);
                            break;
                        }
                }
            }
            else {
                shaderData.removeDefine(Particle2DShader.RotationOverLifetimeDef);
            }
        }
        setTextureSheetAnimation(shaderData) {
            let ps = this.particleSystem;
            if (ps.textureSheetAnimation && ps.textureSheetAnimation.enable) {
                shaderData.addDefine(Particle2DShader.TextureSheetAnimationDef);
                let tiles = ps.textureSheetAnimation.tiles;
                let cycles = ps.textureSheetAnimation.cycles;
                let animationSubUV = tempV4;
                animationSubUV.setValue(tiles.x, tiles.y, cycles, 0);
                shaderData.setVector(Particle2DShader.TextureSheetFrameData, animationSubUV);
                let frame = ps.textureSheetAnimation.frame;
                let mode = ps.textureSheetAnimation.frame.mode;
                switch (mode) {
                    case Laya.ParticleMinMaxCurveMode.Constant:
                        {
                            let value = frame.constant;
                            gradientDataNumberConstant(frame.curve, value);
                            shaderData.setBuffer(Particle2DShader.TextureSheetFrame, frame.curve._elements);
                            shaderData.setBuffer(Particle2DShader.TextureSheetFrameMax, frame.curve._elements);
                            let range = tempV4;
                            fillCurveMinMaxTimeRange(frame.curve, frame.curve, range);
                            shaderData.setVector(Particle2DShader.TextureSheetFrameRange, range);
                            break;
                        }
                    case Laya.ParticleMinMaxCurveMode.Curve:
                        {
                            frame.curve._formatData();
                            shaderData.setBuffer(Particle2DShader.TextureSheetFrame, frame.curve._elements);
                            shaderData.setBuffer(Particle2DShader.TextureSheetFrameMax, frame.curve._elements);
                            let range = tempV4;
                            fillCurveMinMaxTimeRange(frame.curve, frame.curve, range);
                            shaderData.setVector(Particle2DShader.TextureSheetFrameRange, range);
                            break;
                        }
                    case Laya.ParticleMinMaxCurveMode.TwoConstants:
                        {
                            let valueMin = frame.constantMin;
                            let valueMax = frame.constantMax;
                            gradientDataNumberConstant(frame.curveMin, valueMin);
                            gradientDataNumberConstant(frame.curveMax, valueMax);
                            shaderData.setBuffer(Particle2DShader.TextureSheetFrame, frame.curveMin._elements);
                            shaderData.setBuffer(Particle2DShader.TextureSheetFrameMax, frame.curveMax._elements);
                            let range = tempV4;
                            fillCurveMinMaxTimeRange(frame.curveMin, frame.curveMax, range);
                            shaderData.setVector(Particle2DShader.TextureSheetFrameRange, range);
                            break;
                        }
                    case Laya.ParticleMinMaxCurveMode.TwoCurves:
                        {
                            frame.curveMin._formatData();
                            frame.curveMax._formatData();
                            shaderData.setBuffer(Particle2DShader.TextureSheetFrame, frame.curveMin._elements);
                            shaderData.setBuffer(Particle2DShader.TextureSheetFrameMax, frame.curveMax._elements);
                            let range = tempV4;
                            fillCurveMinMaxTimeRange(frame.curveMin, frame.curveMax, range);
                            shaderData.setVector(Particle2DShader.TextureSheetFrameRange, range);
                            break;
                        }
                }
            }
            else {
                shaderData.removeDefine(Particle2DShader.TextureSheetAnimationDef);
            }
        }
        setParticleData(shaderData, worldMat) {
            var _a, _b;
            let ps = this.particleSystem;
            if (!this.particleGeometry || ps.main.maxParticles != this.particleGeometry.maxParitcleCount) {
                this._createRenderGeometry();
            }
            shaderData.setNumber(Particle2DShader.CurrentTime, ps.totalTime);
            shaderData.setNumber(Particle2DShader.UnitPixels, ps.main.unitPixels);
            let scaleX = worldMat.getScaleX();
            let scaleY = worldMat.getScaleY();
            let cosAngle = worldMat.a / scaleX;
            let sinAngle = worldMat.b / scaleX;
            let translateX = nMatrix0.z;
            let translateY = nMatrix1.z;
            let simulationSpace = 0;
            switch (ps.main.simulationSpace) {
                case exports.Particle2DSimulationSpace.Local:
                    simulationSpace = 0;
                    break;
                case exports.Particle2DSimulationSpace.World:
                    simulationSpace = 1;
                    break;
            }
            switch (ps.main.scaleMode) {
                case exports.Particle2DScalingMode.Hierarchy:
                    break;
                case exports.Particle2DScalingMode.Local:
                    scaleX = this.owner.scaleX;
                    scaleY = this.owner.scaleY;
                    if (this.owner.scene) {
                        scaleX *= this.owner.scene.globalScaleX;
                        scaleY *= this.owner.scene.globalScaleY;
                    }
                    break;
            }
            ps.main._spriteRotAndScale.setValue(cosAngle, sinAngle, scaleX, scaleY);
            ps.main._spriteTranslateAndSpace.setValue(translateX, translateY, simulationSpace);
            const Physics2DSettingPixelRatio = (_a = Laya.Physics2DOption === null || Laya.Physics2DOption === void 0 ? void 0 : Laya.Physics2DOption.pixelRatio) !== null && _a !== void 0 ? _a : 50;
            const Physics2DSettingGravity = (_b = Laya.Physics2DOption === null || Laya.Physics2DOption === void 0 ? void 0 : Laya.Physics2DOption.gravity) !== null && _b !== void 0 ? _b : { x: 0, y: 9.8 };
            let physicPixelRatio = ps.main.unitPixels / Physics2DSettingPixelRatio;
            let gravityX = Physics2DSettingGravity.x * physicPixelRatio;
            let gravityY = Physics2DSettingGravity.y * physicPixelRatio;
            let gravityModifier = ps.main.gravityModifier;
            ps.main._gravity.setValue(gravityX * gravityModifier, gravityY * gravityModifier);
            if (ps.emission.rateOverDistance >= 0) {
                let posX = translateX;
                let posY = translateY;
                let lastX = ps.emission._lastPosition.x;
                let lastY = ps.emission._lastPosition.y;
                let dx = (posX - lastX);
                let dy = (posY - lastY);
                let distance = dx * dx + dy * dy;
                distance = Math.sqrt(distance);
                ps._emitDistance += distance;
                ps.emission._lastPosition.set(posX, posY, 0);
            }
            if (ps._dirtyFlags & exports.Particle2DSystemDirtyFlagBits.ColorOverLifetimeBit) {
                this.setParticleColorOverLifetime(shaderData);
                ps._dirtyFlags &= ~exports.Particle2DSystemDirtyFlagBits.ColorOverLifetimeBit;
            }
            if (ps._dirtyFlags & exports.Particle2DSystemDirtyFlagBits.Velocity2DOverLifetimeBit) {
                this.setParticleVelocityOverLifetime(shaderData);
                ps._dirtyFlags &= ~exports.Particle2DSystemDirtyFlagBits.Velocity2DOverLifetimeBit;
            }
            if (ps._dirtyFlags & exports.Particle2DSystemDirtyFlagBits.Size2DOverLifetimeBit) {
                this.setSize2DOverLifetime(shaderData);
                ps._dirtyFlags &= ~exports.Particle2DSystemDirtyFlagBits.Size2DOverLifetimeBit;
            }
            if (ps._dirtyFlags & exports.Particle2DSystemDirtyFlagBits.Rotation2DOverLifetimeBit) {
                this.setRotationOverlifetime(shaderData);
                ps._dirtyFlags &= ~exports.Particle2DSystemDirtyFlagBits.Rotation2DOverLifetimeBit;
            }
            if (ps._dirtyFlags & exports.Particle2DSystemDirtyFlagBits.TextureSheetAnimationBit) {
                this.setTextureSheetAnimation(shaderData);
                ps._dirtyFlags &= ~exports.Particle2DSystemDirtyFlagBits.TextureSheetAnimationBit;
            }
        }
        addCMDCall(px, py) {
        }
        _createRenderGeometry() {
            if (this.particleGeometry) {
                this.particleGeometry.destroy();
                this.particleGeometry = null;
            }
            let maxParticles = this.particleSystem.main.maxParticles;
            let particleDeclaration = Particle2DVertexMesh.Particle2DDeclaration;
            let meshDeclaration = Particle2DVertexMesh.Particle2DMeshDeclaration;
            this.particleGeometry = new Particle2DGeomotry(maxParticles, particleDeclaration, meshDeclaration);
            this._createRenderElements();
        }
        _createRenderElements() {
            this._renderElements.forEach(element => {
                element.destroy();
            });
            this._renderElements.length = 0;
            if (!this.sharedMaterial) {
                return;
            }
            {
                let declaration = Particle2DVertexMesh.Particle2DDeclaration;
                let particleInfo = Particle2DVertexMesh.Particle2DInfo;
                let particleByteStride = declaration.vertexStride;
                this.particleSystem._initParticleData(particleByteStride, particleInfo);
            }
            const createRenderElement = (geometry) => {
                let element = Laya.LayaGL.render2DRenderPassFactory.createRenderElement2D();
                element.geometry = geometry;
                element.value2DShaderData = this._spriteShaderData;
                Laya.BaseRenderNode2D._setRenderElement2DMaterial(element, this.sharedMaterial);
                element.renderStateIsBySprite = false;
                element.nodeCommonMap = this._getcommonUniformMap();
                element.owner = this._struct;
                return element;
            };
            if (this.particleGeometry) {
                let geometry = this.particleGeometry.geometry;
                let element = createRenderElement(geometry);
                this._renderElements.push(element);
            }
        }
        _updateParticleBuffer(startActive, endActive) {
            let ps = this.particleSystem;
            let meshVertexCount = 4;
            let maxParticles = ps.main.maxParticles;
            let particleDatas = ps.particlePool.particleDatas;
            let particleVertexDatas = this.particleGeometry.particleDatas;
            let particleBuffer = this.particleGeometry.particleBuffer;
            let particleStride = ps.particlePool.particleStride;
            let particleByteStride = ps.particlePool.particleByteStride;
            if (startActive <= endActive) {
                let particleCount = endActive - startActive;
                for (let i = startActive; i <= endActive; i++) {
                    fillParticleData(i, particleStride, particleByteStride, particleDatas, meshVertexCount, particleVertexDatas);
                }
                let start = startActive * meshVertexCount * particleByteStride;
                let length = particleCount * meshVertexCount * particleByteStride;
                particleBuffer.setData(particleVertexDatas.buffer, start, start, length);
            }
            else {
                {
                    for (let i = startActive; i <= maxParticles; i++) {
                        fillParticleData(i, particleStride, particleByteStride, particleDatas, meshVertexCount, particleVertexDatas);
                    }
                    let start = startActive * meshVertexCount * particleByteStride;
                    let length = (maxParticles + 1 - startActive) * meshVertexCount * particleByteStride;
                    particleBuffer.setData(particleVertexDatas.buffer, start, start, length);
                }
                {
                    for (let i = 0; i < endActive; i++) {
                        fillParticleData(i, particleStride, particleByteStride, particleDatas, meshVertexCount, particleVertexDatas);
                    }
                    let start = 0;
                    let length = endActive * meshVertexCount * particleByteStride;
                    particleBuffer.setData(particleVertexDatas.buffer, start, start, length);
                }
            }
        }
        renderUpdate(context) {
            let ps = this.particleSystem;
            this.setParticleData(this._spriteShaderData, this.owner._globalTrans.getMatrix());
            this._updateLight();
            if (this._renderElements.length <= 0) {
                return;
            }
            if (this._updateMark != Laya.Stat.loopCount) {
                this._updateMark = Laya.Stat.loopCount;
                let elapsedTime = this.owner.timer.delta / 1000;
                ps._update(elapsedTime);
                const startUpdate = ps.particlePool.updateStartIndex;
                const endUpdate = ps.particlePool.updateEndIndex;
                if (startUpdate != endUpdate) {
                    this._updateParticleBuffer(startUpdate, endUpdate);
                }
                const startActive = ps.particlePool.activeStartIndex;
                const endActive = ps.particlePool.activeEndIndex;
                let meshIndexCount = 6;
                let maxParticles = ps.main.maxParticles;
                if (startActive <= endActive) {
                    let particleCount = endActive - startActive;
                    this._renderElements.forEach(element => {
                        element.geometry.clearRenderParams();
                        let drawCount = particleCount * meshIndexCount;
                        element.geometry.setDrawElemenParams(drawCount, startActive * meshIndexCount * 2);
                    });
                }
                else {
                    this._renderElements.forEach(element => {
                        element.geometry.clearRenderParams();
                        let drawCount = (maxParticles + 1 - startActive) * meshIndexCount;
                        element.geometry.setDrawElemenParams(drawCount, startActive * meshIndexCount * 2);
                        drawCount = endActive * meshIndexCount;
                        if (drawCount > 0) {
                            element.geometry.setDrawElemenParams(drawCount, 0);
                        }
                    });
                }
            }
        }
        onEnable() {
            let ps = this.particleSystem;
            if (Laya.LayaEnv.isPlaying && ps.main.playOnAwake) {
                ps.play();
            }
        }
        onDisable() {
            let ps = this.particleSystem;
            ps.simulate(0, true);
        }
        onDestroy() {
            if (this.particleGeometry) {
                this.particleGeometry.destroy();
                this.particleGeometry = null;
            }
            this.particleSystem.destroy();
        }
        _cloneTo(dest) {
            super._cloneTo(dest);
            this.particleSystem.cloneTo(dest.particleSystem);
        }
    }
    Laya.addAfterInitCallback(() => {
        Particle2DVertexMesh.init();
        Particle2DShader.init();
    });

    Laya.ClassUtils.regClass("Base2DShape", Base2DShape);
    Laya.ClassUtils.regClass("Box2DShape", Box2DShape);
    Laya.ClassUtils.regClass("Circle2DShape", Circle2DShape);
    Laya.ClassUtils.regClass("FanShape", FanShape);
    Laya.ClassUtils.regClass("SemicircleShap", SemicircleShap);
    Laya.ClassUtils.regClass("Main2DModule", Main2DModule);
    Laya.ClassUtils.regClass("Rotation2DOverLifetimeModule", Rotation2DOverLifetimeModule);
    Laya.ClassUtils.regClass("Shape2DModule", Shape2DModule);
    Laya.ClassUtils.regClass("Size2DOverLifetimeModule", Size2DOverLifetimeModule);
    Laya.ClassUtils.regClass("Velocity2DOverLifetimeModule", Velocity2DOverLifetimeModule);
    Laya.ClassUtils.regClass("ShurikenParticle2DSystem", ShurikenParticle2DSystem);
    Laya.ClassUtils.regClass("ShurikenParticle2DRenderer", ShurikenParticle2DRenderer);

    exports.Base2DShape = Base2DShape;
    exports.Box2DShape = Box2DShape;
    exports.Circle2DShape = Circle2DShape;
    exports.FanShape = FanShape;
    exports.Main2DModule = Main2DModule;
    exports.Particle2DGeomotry = Particle2DGeomotry;
    exports.Particle2DShader = Particle2DShader;
    exports.Particle2DVertexMesh = Particle2DVertexMesh;
    exports.Rotation2DOverLifetimeModule = Rotation2DOverLifetimeModule;
    exports.SemicircleShap = SemicircleShap;
    exports.Shape2DModule = Shape2DModule;
    exports.ShurikenParticle2DRenderer = ShurikenParticle2DRenderer;
    exports.ShurikenParticle2DSystem = ShurikenParticle2DSystem;
    exports.Size2DOverLifetimeModule = Size2DOverLifetimeModule;
    exports.Velocity2DOverLifetimeModule = Velocity2DOverLifetimeModule;

})(window.Laya = window.Laya || {}, Laya);
