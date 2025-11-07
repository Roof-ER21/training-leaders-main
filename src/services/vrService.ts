import * as THREE from 'three';

export interface VRCapabilities {
  immersiveVR: boolean;
  immersiveAR: boolean;
  handTracking: boolean;
  eyeTracking: boolean;
  boundedFloor: boolean;
  unbounded: boolean;
}

export interface VRController {
  id: number;
  hand: 'left' | 'right' | 'none';
  position: THREE.Vector3;
  rotation: THREE.Quaternion;
  buttons: boolean[];
  axes: number[];
  hapticActuators: any[];
}

export interface VRSessionConfig {
  requiredFeatures?: string[];
  optionalFeatures?: string[];
  environmentBlendMode?: 'opaque' | 'alpha-blend' | 'additive';
}

export interface TrainingScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  objectives: string[];
  safetyFocus: string[];
  environment: 'roof' | 'workshop' | 'virtual';
  tools: string[];
  hazards: string[];
  successCriteria: string[];
}

export interface VRMetrics {
  sessionDuration: number;
  tasksCompleted: number;
  safetyViolations: number;
  toolsUsed: string[];
  accuracy: number;
  efficiency: number;
  confidenceScore: number;
}

class VRService {
  private xr: any = null;
  private session: any = null;
  private referenceSpace: any = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private controllers: VRController[] = [];
  private frameId: number = 0;

  // Event callbacks
  private onSessionStart?: () => void;
  private onSessionEnd?: () => void;
  private onControllerConnect?: (controller: VRController) => void;
  private onControllerDisconnect?: (controller: VRController) => void;
  private onError?: (error: string) => void;

  constructor() {
    this.xr = (navigator as any).xr;
  }

  // Check VR capabilities
  async getVRCapabilities(): Promise<VRCapabilities> {
    if (!this.xr) {
      return {
        immersiveVR: false,
        immersiveAR: false,
        handTracking: false,
        eyeTracking: false,
        boundedFloor: false,
        unbounded: false,
      };
    }

    try {
      const [
        immersiveVR,
        immersiveAR,
        handTracking,
        eyeTracking,
        boundedFloor,
        unbounded,
      ] = await Promise.all([
        this.xr.isSessionSupported('immersive-vr'),
        this.xr.isSessionSupported('immersive-ar'),
        this.xr.isSessionSupported('immersive-vr', {
          optionalFeatures: ['hand-tracking'],
        }),
        this.xr.isSessionSupported('immersive-vr', {
          optionalFeatures: ['eye-tracking'],
        }),
        this.xr.isSessionSupported('immersive-vr', {
          optionalFeatures: ['bounded-floor'],
        }),
        this.xr.isSessionSupported('immersive-vr', {
          optionalFeatures: ['unbounded'],
        }),
      ]);

      return {
        immersiveVR,
        immersiveAR,
        handTracking,
        eyeTracking,
        boundedFloor,
        unbounded,
      };
    } catch (error) {
      console.error('Error checking VR capabilities:', error);
      return {
        immersiveVR: false,
        immersiveAR: false,
        handTracking: false,
        eyeTracking: false,
        boundedFloor: false,
        unbounded: false,
      };
    }
  }

  // Start VR session
  async startVRSession(config: VRSessionConfig = {}): Promise<boolean> {
    if (!this.xr) {
      this.onError?.('WebXR is not supported on this device');
      return false;
    }

    try {
      const defaultConfig: VRSessionConfig = {
        optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking'],
        ...config,
      };

      this.session = await this.xr.requestSession(
        'immersive-vr',
        defaultConfig
      );

      // Set up reference space
      this.referenceSpace =
        await this.session.requestReferenceSpace('local-floor');

      // Set up renderer
      this.setupRenderer();

      // Set up event listeners
      this.session.addEventListener('end', this.onSessionEndHandler.bind(this));
      this.session.addEventListener(
        'inputsourceschange',
        this.onInputSourcesChange.bind(this)
      );

      // Start render loop
      this.session.requestAnimationFrame(this.onXRFrame.bind(this));

      this.onSessionStart?.();
      return true;
    } catch (error) {
      console.error('Failed to start VR session:', error);
      this.onError?.(`Failed to start VR session: ${error}`);
      return false;
    }
  }

  // End VR session
  async endVRSession(): Promise<void> {
    if (this.session) {
      await this.session.end();
      this.session = null;
    }
  }

  // Setup Three.js renderer for VR
  private setupRenderer(): void {
    if (!this.session) return;

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.xr.enabled = true;
    this.renderer.xr.setSession(this.session);

    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb); // Sky blue

    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 0.5);
    this.scene.add(directionalLight);
  }

  // Handle VR frame updates
  private onXRFrame(time: number, frame: any): void {
    if (!this.session || !this.renderer || !this.scene || !this.camera) return;

    this.frameId = this.session.requestAnimationFrame(
      this.onXRFrame.bind(this)
    );

    // Update controllers
    this.updateControllers(frame);

    // Render the scene
    this.renderer.render(this.scene, this.camera);
  }

  // Update controller data
  private updateControllers(frame: any): void {
    const inputSources = this.session.inputSources;
    this.controllers = [];

    for (let i = 0; i < inputSources.length; i++) {
      const inputSource = inputSources[i];
      const pose = frame.getPose(
        inputSource.targetRaySpace,
        this.referenceSpace
      );

      if (pose) {
        const controller: VRController = {
          id: i,
          hand: inputSource.hand || 'none',
          position: new THREE.Vector3(
            pose.transform.position.x,
            pose.transform.position.y,
            pose.transform.position.z
          ),
          rotation: new THREE.Quaternion(
            pose.transform.orientation.x,
            pose.transform.orientation.y,
            pose.transform.orientation.z,
            pose.transform.orientation.w
          ),
          buttons: inputSource.gamepad
            ? Array.from(inputSource.gamepad.buttons).map((b: any) => b.pressed)
            : [],
          axes: inputSource.gamepad ? Array.from(inputSource.gamepad.axes) : [],
          hapticActuators: inputSource.gamepad
            ? inputSource.gamepad.hapticActuators
            : [],
        };

        this.controllers.push(controller);
      }
    }
  }

  // Handle session end
  private onSessionEndHandler(): void {
    this.session = null;
    this.referenceSpace = null;
    this.controllers = [];

    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = 0;
    }

    this.onSessionEnd?.();
  }

  // Handle input source changes
  private onInputSourcesChange(event: any): void {
    for (const inputSource of event.added) {
      console.log('Controller connected:', inputSource);
    }

    for (const inputSource of event.removed) {
      console.log('Controller disconnected:', inputSource);
    }
  }

  // Set event callbacks
  setEventCallbacks(callbacks: {
    onSessionStart?: () => void;
    onSessionEnd?: () => void;
    onControllerConnect?: (controller: VRController) => void;
    onControllerDisconnect?: (controller: VRController) => void;
    onError?: (error: string) => void;
  }): void {
    this.onSessionStart = callbacks.onSessionStart;
    this.onSessionEnd = callbacks.onSessionEnd;
    this.onControllerConnect = callbacks.onControllerConnect;
    this.onControllerDisconnect = callbacks.onControllerDisconnect;
    this.onError = callbacks.onError;
  }

  // Get current controllers
  getControllers(): VRController[] {
    return this.controllers;
  }

  // Get scene (for adding objects)
  getScene(): THREE.Scene | null {
    return this.scene;
  }

  // Get renderer
  getRenderer(): THREE.WebGLRenderer | null {
    return this.renderer;
  }

  // Get camera
  getCamera(): THREE.PerspectiveCamera | null {
    return this.camera;
  }

  // Haptic feedback
  triggerHapticFeedback(
    controllerId: number,
    intensity: number = 1.0,
    duration: number = 100
  ): void {
    const controller = this.controllers.find(c => c.id === controllerId);
    if (controller && controller.hapticActuators.length > 0) {
      controller.hapticActuators[0].pulse(intensity, duration);
    }
  }

  // Training scenarios
  getTrainingScenarios(): TrainingScenario[] {
    return [
      {
        id: 'safety-harness',
        title: 'Safety Harness Training',
        description:
          'Learn proper safety harness setup and fall protection systems',
        difficulty: 'Beginner',
        duration: '10-15 minutes',
        objectives: [
          'Properly inspect safety harness',
          'Correctly put on and adjust harness',
          'Connect to appropriate anchor points',
          'Test fall protection system',
        ],
        safetyFocus: [
          'Pre-use inspection procedures',
          'Proper harness adjustment',
          'Anchor point selection',
          'Fall protection principles',
        ],
        environment: 'workshop',
        tools: [
          'Safety harness',
          'Lanyard',
          'Anchor points',
          'Inspection checklist',
        ],
        hazards: [
          'Improper fit',
          'Damaged equipment',
          'Inadequate anchor points',
        ],
        successCriteria: [
          'Complete harness inspection',
          'Proper harness adjustment',
          'Secure anchor connection',
          'Pass safety check',
        ],
      },
      {
        id: 'roof-inspection',
        title: 'Roof Inspection Walkthrough',
        description:
          'Virtual roof inspection to identify hazards and assess conditions',
        difficulty: 'Intermediate',
        duration: '15-20 minutes',
        objectives: [
          'Identify structural hazards',
          'Assess roof condition',
          'Document findings',
          'Plan safe work approach',
        ],
        safetyFocus: [
          'Hazard recognition',
          'Safe movement on roof',
          'Weather considerations',
          'Personal protective equipment',
        ],
        environment: 'roof',
        tools: ['Inspection checklist', 'Camera', 'Measuring tape', 'Ladder'],
        hazards: [
          'Weak spots',
          'Loose materials',
          'Weather conditions',
          'Fall risks',
        ],
        successCriteria: [
          'Complete inspection checklist',
          'Identify all hazards',
          'Document conditions',
          'Create safety plan',
        ],
      },
      {
        id: 'shingle-installation',
        title: 'Shingle Installation Practice',
        description:
          'Hands-on practice of proper shingle installation techniques',
        difficulty: 'Intermediate',
        duration: '20-30 minutes',
        objectives: [
          'Prepare roof surface',
          'Install starter strips',
          'Install shingles with proper alignment',
          'Complete ridge and hip details',
        ],
        safetyFocus: [
          'Tool safety',
          'Material handling',
          'Proper positioning',
          'Weather awareness',
        ],
        environment: 'roof',
        tools: [
          'Hammer',
          'Nail gun',
          'Utility knife',
          'Chalk line',
          'Shingles',
        ],
        hazards: [
          'Tool injuries',
          'Fall risks',
          'Material handling',
          'Weather exposure',
        ],
        successCriteria: [
          'Proper surface preparation',
          'Correct shingle alignment',
          'Adequate fastening',
          'Quality finish details',
        ],
      },
      {
        id: 'emergency-response',
        title: 'Emergency Response Simulation',
        description: 'Practice emergency procedures for roofing accidents',
        difficulty: 'Advanced',
        duration: '15-25 minutes',
        objectives: [
          'Respond to fall incident',
          'Provide first aid',
          'Secure work area',
          'Communicate with emergency services',
        ],
        safetyFocus: [
          'Emergency recognition',
          'First aid procedures',
          'Communication protocols',
          'Scene management',
        ],
        environment: 'roof',
        tools: ['First aid kit', 'Communication device', 'Rescue equipment'],
        hazards: [
          'Additional injuries',
          'Panic response',
          'Inadequate communication',
        ],
        successCriteria: [
          'Proper emergency assessment',
          'Effective first aid',
          'Clear communication',
          'Scene secured',
        ],
      },
      {
        id: 'material-handling',
        title: 'Safe Material Handling',
        description:
          'Learn proper techniques for lifting and moving roofing materials',
        difficulty: 'Beginner',
        duration: '10-15 minutes',
        objectives: [
          'Practice proper lifting technique',
          'Use mechanical aids effectively',
          'Plan material placement',
          'Work as a team',
        ],
        safetyFocus: [
          'Proper lifting mechanics',
          'Team coordination',
          'Equipment usage',
          'Back injury prevention',
        ],
        environment: 'workshop',
        tools: ['Conveyor belt', 'Hoist', 'Hand truck', 'Various materials'],
        hazards: [
          'Back injury',
          'Dropped materials',
          'Pinch points',
          'Team miscommunication',
        ],
        successCriteria: [
          'Demonstrate proper lifting',
          'Effective tool usage',
          'Safe material placement',
          'Good team coordination',
        ],
      },
      {
        id: 'weather-assessment',
        title: 'Weather Conditions Assessment',
        description:
          'Learn to assess weather conditions and make safety decisions',
        difficulty: 'Intermediate',
        duration: '10-15 minutes',
        objectives: [
          'Read weather conditions',
          'Assess wind levels',
          'Evaluate precipitation risk',
          'Make go/no-go decisions',
        ],
        safetyFocus: [
          'Weather awareness',
          'Risk assessment',
          'Decision making',
          'Safety prioritization',
        ],
        environment: 'roof',
        tools: ['Weather instruments', 'Weather app', 'Safety checklist'],
        hazards: [
          'Sudden weather changes',
          'Poor visibility',
          'Slippery surfaces',
        ],
        successCriteria: [
          'Accurate weather assessment',
          'Appropriate safety decisions',
          'Clear documentation',
          'Team communication',
        ],
      },
    ];
  }

  // Load training scenario
  async loadTrainingScenario(
    scenarioId: string
  ): Promise<TrainingScenario | null> {
    const scenarios = this.getTrainingScenarios();
    return scenarios.find(s => s.id === scenarioId) || null;
  }

  // Start training session
  async startTrainingSession(scenarioId: string): Promise<VRMetrics> {
    const scenario = await this.loadTrainingScenario(scenarioId);
    if (!scenario) {
      throw new Error(`Training scenario ${scenarioId} not found`);
    }

    // Initialize metrics tracking

    const metrics: VRMetrics = {
      sessionDuration: 0,
      tasksCompleted: 0,
      safetyViolations: 0,
      toolsUsed: [],
      accuracy: 0,
      efficiency: 0,
      confidenceScore: 0,
    };

    // Load scenario environment and objects
    await this.loadScenarioEnvironment(scenario);

    return metrics;
  }

  // Load scenario environment
  private async loadScenarioEnvironment(
    scenario: TrainingScenario
  ): Promise<void> {
    if (!this.scene) return;

    // Clear existing objects
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }

    // Add environment based on scenario type
    switch (scenario.environment) {
      case 'roof':
        await this.createRoofEnvironment();
        break;
      case 'workshop':
        await this.createWorkshopEnvironment();
        break;
      case 'virtual':
        await this.createVirtualEnvironment();
        break;
    }

    // Add scenario-specific tools and objects
    this.addScenarioObjects(scenario);
  }

  // Create roof environment
  private async createRoofEnvironment(): Promise<void> {
    if (!this.scene) return;

    // Create roof surface
    const roofGeometry = new THREE.PlaneGeometry(20, 15);
    const roofMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 }); // Brown
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.rotation.x = -Math.PI / 2; // Horizontal
    roof.position.y = 5; // Elevated
    this.scene.add(roof);

    // Create house structure
    const houseGeometry = new THREE.BoxGeometry(18, 8, 12);
    const houseMaterial = new THREE.MeshLambertMaterial({ color: 0xdddddd }); // Light gray
    const house = new THREE.Mesh(houseGeometry, houseMaterial);
    house.position.y = 1; // Below roof
    this.scene.add(house);

    // Create ground
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x90ee90 }); // Light green
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -3;
    this.scene.add(ground);

    // Add sky
    this.scene.background = new THREE.Color(0x87ceeb); // Sky blue
  }

  // Create workshop environment
  private async createWorkshopEnvironment(): Promise<void> {
    if (!this.scene) return;

    // Create floor
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 }); // Gray
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    this.scene.add(floor);

    // Create walls
    const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xeeeeee }); // Light gray

    // Back wall
    const backWallGeometry = new THREE.PlaneGeometry(20, 10);
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.z = -10;
    backWall.position.y = 5;
    this.scene.add(backWall);

    // Side walls
    const sideWallGeometry = new THREE.PlaneGeometry(20, 10);

    const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.x = -10;
    leftWall.position.y = 5;
    this.scene.add(leftWall);

    const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.x = 10;
    rightWall.position.y = 5;
    this.scene.add(rightWall);

    // Add ceiling
    const ceilingGeometry = new THREE.PlaneGeometry(20, 20);
    const ceilingMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff }); // White
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 10;
    this.scene.add(ceiling);
  }

  // Create virtual environment
  private async createVirtualEnvironment(): Promise<void> {
    if (!this.scene) return;

    // Create a simple virtual space with grid
    const size = 100;
    const divisions = 50;

    const gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);

    // Add a simple skybox
    this.scene.background = new THREE.Color(0x222222); // Dark gray
  }

  // Add scenario-specific objects
  private addScenarioObjects(scenario: TrainingScenario): void {
    if (!this.scene) return;

    // Add tools as simple geometric objects (in a real implementation, these would be detailed 3D models)
    scenario.tools.forEach((tool, index) => {
      const toolGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.2);
      const toolMaterial = new THREE.MeshLambertMaterial({ color: 0xff6600 }); // Orange
      const toolMesh = new THREE.Mesh(toolGeometry, toolMaterial);
      toolMesh.position.x = index * 1 - scenario.tools.length / 2;
      toolMesh.position.y = 1;
      toolMesh.position.z = 2;
      this.scene!.add(toolMesh);
    });
  }

  // Check if VR is available
  static isVRAvailable(): boolean {
    return !!(navigator as any).xr;
  }

  // Get VR display info
  static async getVRDisplayInfo(): Promise<string> {
    if (!(navigator as any).xr) {
      return 'WebXR not supported';
    }

    try {
      const supported = await (navigator as any).xr.isSessionSupported(
        'immersive-vr'
      );
      return supported ? 'VR supported' : 'VR not supported';
    } catch (error) {
      return `VR check failed: ${error}`;
    }
  }
}

export default VRService;
