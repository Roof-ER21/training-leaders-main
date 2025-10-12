import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Box, Plane, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import VRService, {
  VRCapabilities,
  TrainingScenario,
  VRController,
  VRMetrics,
} from '../services/vrService';
import * as THREE from 'three';
import {
  Glasses as VrHeadset,
  Play,
  Pause,
  RotateCcw,
  Settings,
  CheckCircle,
  AlertTriangle,
  Target,
  Clock,
  Award,
  Shield,
  Gamepad2,
  Monitor,
  X,
  ArrowLeft,
  ArrowRight,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Headphones,
  Brain,
  BookOpen,
} from 'lucide-react';

interface VRTrainingProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModule?: string;
  onScenarioComplete?: (metrics: VRMetrics) => void;
  className?: string;
}

interface VRSessionState {
  isActive: boolean;
  isLoading: boolean;
  error: string | null;
  currentScenario: TrainingScenario | null;
  sessionMetrics: VRMetrics | null;
  controllers: VRController[];
}

// 3D Scene Components
const RoofScene: React.FC<{ scenario?: TrainingScenario }> = ({ scenario }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group>
      {/* Sky */}
      <color attach="background" args={['#87ceeb']} />

      {/* Ground */}
      <Plane
        ref={meshRef}
        args={[50, 50]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -5, 0]}
      >
        <meshLambertMaterial color="#90ee90" />
      </Plane>

      {/* House structure */}
      <Box args={[18, 8, 12]} position={[0, 0, 0]}>
        <meshLambertMaterial color="#dddddd" />
      </Box>

      {/* Roof */}
      <Plane
        args={[20, 15]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 4.5, 0]}
      >
        <meshLambertMaterial color="#8b4513" />
      </Plane>

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[0, 10, 0]} intensity={0.5} />

      {/* Scenario-specific objects */}
      {scenario && (
        <group>
          {scenario.tools.map((tool, index) => (
            <Box
              key={index}
              args={[0.5, 0.1, 0.2]}
              position={[index * 1 - scenario.tools.length / 2, 1, 2]}
            >
              <meshLambertMaterial color="#ff6600" />
            </Box>
          ))}

          {/* Safety markers */}
          {scenario.safetyFocus.map((_, index) => (
            <Box
              key={index}
              args={[0.3, 2, 0.3]}
              position={[index * 2 - 4, 0, -5]}
            >
              <meshLambertMaterial color="#ff0000" />
            </Box>
          ))}
        </group>
      )}

      {/* Text overlays */}
      {scenario && (
        <Text
          position={[0, 8, -10]}
          fontSize={1}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {scenario.title}
        </Text>
      )}
    </group>
  );
};

const WorkshopScene: React.FC<{ scenario?: TrainingScenario }> = ({
  scenario,
}) => {
  return (
    <group>
      {/* Workshop environment */}
      <color attach="background" args={['#f0f0f0']} />

      {/* Floor */}
      <Plane
        args={[20, 20]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
      >
        <meshLambertMaterial color="#666666" />
      </Plane>

      {/* Walls */}
      <Plane args={[20, 10]} position={[0, 5, -10]}>
        <meshLambertMaterial color="#eeeeee" />
      </Plane>

      <Plane
        args={[20, 10]}
        rotation={[0, Math.PI / 2, 0]}
        position={[-10, 5, 0]}
      >
        <meshLambertMaterial color="#eeeeee" />
      </Plane>

      <Plane
        args={[20, 10]}
        rotation={[0, -Math.PI / 2, 0]}
        position={[10, 5, 0]}
      >
        <meshLambertMaterial color="#eeeeee" />
      </Plane>

      {/* Ceiling */}
      <Plane
        args={[20, 20]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 10, 0]}
      >
        <meshLambertMaterial color="#ffffff" />
      </Plane>

      {/* Work bench */}
      <Box args={[8, 0.2, 2]} position={[0, 1, -5]}>
        <meshLambertMaterial color="#8b4513" />
      </Box>

      {/* Tools and equipment */}
      {scenario &&
        scenario.tools.map((tool, index) => (
          <Box
            key={index}
            args={[0.3, 0.1, 0.1]}
            position={[index * 0.5 - 2, 1.2, -5]}
          >
            <meshLambertMaterial color="#333333" />
          </Box>
        ))}

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 8, 0]} intensity={1} />
      <directionalLight position={[5, 10, 5]} intensity={0.5} />

      {/* Text */}
      {scenario && (
        <Text
          position={[0, 7, -9]}
          fontSize={0.5}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {scenario.title} - Workshop Training
        </Text>
      )}
    </group>
  );
};

const VirtualScene: React.FC<{ scenario?: TrainingScenario }> = ({
  scenario,
}) => {
  return (
    <group>
      <color attach="background" args={['#222222']} />

      {/* Grid helper */}
      <gridHelper args={[100, 50]} />

      {/* Floating platforms for training */}
      <Box args={[5, 0.2, 5]} position={[0, 0, 0]}>
        <meshLambertMaterial color="#4a90e2" />
      </Box>

      <Box args={[3, 0.2, 3]} position={[8, 2, -5]}>
        <meshLambertMaterial color="#50c878" />
      </Box>

      <Box args={[4, 0.2, 4]} position={[-6, 1, 3]}>
        <meshLambertMaterial color="#ff6b6b" />
      </Box>

      {/* Interactive objects */}
      {scenario &&
        scenario.tools.map((tool, index) => (
          <Box
            key={index}
            args={[0.5, 0.5, 0.5]}
            position={[
              Math.sin((index * Math.PI) / 4) * 3,
              1 + index * 0.5,
              Math.cos((index * Math.PI) / 4) * 3,
            ]}
          >
            <meshLambertMaterial color={`hsl(${index * 60}, 70%, 50%)`} />
          </Box>
        ))}

      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

      {/* Text */}
      {scenario && (
        <Text
          position={[0, 5, -8]}
          fontSize={0.8}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Virtual Training: {scenario.title}
        </Text>
      )}
    </group>
  );
};

const VRTraining: React.FC<VRTrainingProps> = ({
  isOpen,
  onClose,
  selectedModule,
  onScenarioComplete,
  className = '',
}) => {
  // Core state
  const [vrService] = useState(() => new VRService());
  const [vrCapabilities, setVrCapabilities] = useState<VRCapabilities | null>(
    null
  );
  const [sessionState, setSessionState] = useState<VRSessionState>({
    isActive: false,
    isLoading: false,
    error: null,
    currentScenario: null,
    sessionMetrics: null,
    controllers: [],
  });

  // UI state
  const [selectedScenario, setSelectedScenario] =
    useState<TrainingScenario | null>(null);
  const [is3DView, setIs3DView] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [volume, setVolume] = useState(0.7);
  const [showSettings, setShowSettings] = useState(false);

  // Training state
  const [trainingScenarios, setTrainingScenarios] = useState<
    TrainingScenario[]
  >([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  // Initialize VR service and capabilities
  useEffect(() => {
    const initializeVR = async () => {
      try {
        const capabilities = await vrService.getVRCapabilities();
        setVrCapabilities(capabilities);

        const scenarios = vrService.getTrainingScenarios();
        setTrainingScenarios(scenarios);

        // Set up VR event callbacks
        vrService.setEventCallbacks({
          onSessionStart: () => {
            setSessionState(prev => ({
              ...prev,
              isActive: true,
              isLoading: false,
            }));
          },
          onSessionEnd: () => {
            setSessionState(prev => ({
              ...prev,
              isActive: false,
              isLoading: false,
              currentScenario: null,
            }));
          },
          onControllerConnect: controller => {
            setSessionState(prev => ({
              ...prev,
              controllers: [
                ...prev.controllers.filter(c => c.id !== controller.id),
                controller,
              ],
            }));
          },
          onControllerDisconnect: controller => {
            setSessionState(prev => ({
              ...prev,
              controllers: prev.controllers.filter(c => c.id !== controller.id),
            }));
          },
          onError: error => {
            setSessionState(prev => ({ ...prev, error, isLoading: false }));
          },
        });
      } catch (error) {
        console.error('Failed to initialize VR:', error);
        setSessionState(prev => ({
          ...prev,
          error: 'Failed to initialize VR system',
        }));
      }
    };

    if (isOpen) {
      initializeVR();
    }
  }, [isOpen, vrService]);

  // Start VR session
  const startVRSession = async (scenario: TrainingScenario) => {
    setSessionState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const success = await vrService.startVRSession({
        optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking'],
      });

      if (success) {
        const metrics = await vrService.startTrainingSession(scenario.id);
        setSessionState(prev => ({
          ...prev,
          currentScenario: scenario,
          sessionMetrics: metrics,
          isLoading: false,
        }));
      } else {
        throw new Error('Failed to start VR session');
      }
    } catch (error) {
      console.error('VR session failed:', error);
      setSessionState(prev => ({
        ...prev,
        error: `VR session failed: ${error}`,
        isLoading: false,
      }));
    }
  };

  // End VR session
  const endVRSession = async () => {
    try {
      await vrService.endVRSession();
      if (sessionState.sessionMetrics && onScenarioComplete) {
        onScenarioComplete(sessionState.sessionMetrics);
      }
    } catch (error) {
      console.error('Failed to end VR session:', error);
    }
  };

  // Start 3D preview
  const start3DPreview = (scenario: TrainingScenario) => {
    setSelectedScenario(scenario);
    setIs3DView(true);
    setShowInstructions(false);
  };

  // Get scene component based on environment
  const getSceneComponent = (
    environment: string,
    scenario: TrainingScenario
  ) => {
    switch (environment) {
      case 'roof':
        return <RoofScene scenario={scenario} />;
      case 'workshop':
        return <WorkshopScene scenario={scenario} />;
      case 'virtual':
        return <VirtualScene scenario={scenario} />;
      default:
        return <VirtualScene scenario={scenario} />;
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'Intermediate':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'Advanced':
        return 'text-red-600 bg-red-100 border-red-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  // Get environment icon
  const getEnvironmentIcon = (environment: string) => {
    switch (environment) {
      case 'roof':
        return Shield;
      case 'workshop':
        return Target;
      case 'virtual':
        return Brain;
      default:
        return BookOpen;
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 ${className}`}
      onClick={() => !sessionState.isActive && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className={`bg-white rounded-2xl shadow-2xl overflow-hidden ${
          isFullscreen ? 'w-screen h-screen' : 'max-w-6xl w-full max-h-[90vh]'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <VrHeadset className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">VR Training Center</h2>
                <p className="text-purple-100">
                  {sessionState.isActive
                    ? `Active: ${sessionState.currentScenario?.title}`
                    : 'Immersive roofing safety training'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {vrCapabilities?.immersiveVR && (
                <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-lg px-3 py-2">
                  <CheckCircle className="w-4 h-4 text-green-300" />
                  <span className="text-sm">VR Ready</span>
                </div>
              )}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                {isFullscreen ? (
                  <Minimize className="w-5 h-5" />
                ) : (
                  <Maximize className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={onClose}
                disabled={sessionState.isActive}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Session status */}
          {sessionState.isActive && sessionState.currentScenario && (
            <div className="mt-4 flex items-center justify-between bg-white bg-opacity-10 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span>Active Session</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Gamepad2 className="w-4 h-4" />
                  <span>{sessionState.controllers.length} Controllers</span>
                </div>
              </div>
              <button
                onClick={endVRSession}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
              >
                End Session
              </button>
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="flex h-full">
          {/* Sidebar - Scenarios */}
          {!is3DView && (
            <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Training Scenarios
                </h3>

                {/* VR Capability Status */}
                {vrCapabilities && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      VR Capabilities
                    </h4>
                    <div className="space-y-1 text-xs">
                      <div
                        className={`flex items-center justify-between ${vrCapabilities.immersiveVR ? 'text-green-600' : 'text-red-600'}`}
                      >
                        <span>Immersive VR</span>
                        {vrCapabilities.immersiveVR ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                      </div>
                      <div
                        className={`flex items-center justify-between ${vrCapabilities.handTracking ? 'text-green-600' : 'text-gray-400'}`}
                      >
                        <span>Hand Tracking</span>
                        {vrCapabilities.handTracking ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                      </div>
                      <div
                        className={`flex items-center justify-between ${vrCapabilities.boundedFloor ? 'text-green-600' : 'text-gray-400'}`}
                      >
                        <span>Room Scale</span>
                        {vrCapabilities.boundedFloor ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Scenarios List */}
                <div className="space-y-4">
                  {trainingScenarios.map(scenario => {
                    const EnvironmentIcon = getEnvironmentIcon(
                      scenario.environment
                    );

                    return (
                      <div
                        key={scenario.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer"
                        onClick={() => setSelectedScenario(scenario)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <EnvironmentIcon className="w-5 h-5 text-blue-600" />
                            <h4 className="font-medium text-gray-900">
                              {scenario.title}
                            </h4>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(scenario.difficulty)}`}
                          >
                            {scenario.difficulty}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">
                          {scenario.description}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{scenario.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Target className="w-3 h-3" />
                            <span>{scenario.objectives.length} objectives</span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              start3DPreview(scenario);
                            }}
                            className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                          >
                            <Monitor className="w-4 h-4 inline mr-2" />
                            Preview 3D
                          </button>

                          {vrCapabilities?.immersiveVR && (
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                startVRSession(scenario);
                              }}
                              disabled={
                                sessionState.isLoading || sessionState.isActive
                              }
                              className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm disabled:opacity-50"
                            >
                              <VrHeadset className="w-4 h-4 inline mr-2" />
                              Start VR
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Main content area */}
          <div className={`${is3DView ? 'w-full' : 'w-2/3'} flex flex-col`}>
            {/* 3D Preview */}
            {is3DView && selectedScenario ? (
              <div className="flex-1 relative">
                <div className="absolute top-4 left-4 z-10 flex space-x-2">
                  <button
                    onClick={() => {
                      setIs3DView(false);
                      setSelectedScenario(null);
                    }}
                    className="px-3 py-2 bg-white bg-opacity-90 rounded-lg shadow hover:bg-opacity-100 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4 inline mr-2" />
                    Back to Scenarios
                  </button>

                  {vrCapabilities?.immersiveVR && (
                    <button
                      onClick={() => startVRSession(selectedScenario)}
                      disabled={sessionState.isLoading || sessionState.isActive}
                      className="px-3 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                      <VrHeadset className="w-4 h-4 inline mr-2" />
                      Start VR Session
                    </button>
                  )}
                </div>

                <Canvas camera={{ position: [5, 5, 5], fov: 75 }}>
                  <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                  />
                  {getSceneComponent(
                    selectedScenario.environment,
                    selectedScenario
                  )}
                </Canvas>

                {/* Scenario Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-95 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedScenario.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(selectedScenario.difficulty)}`}
                    >
                      {selectedScenario.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {selectedScenario.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">
                        Objectives:
                      </h4>
                      <ul className="space-y-1">
                        {selectedScenario.objectives
                          .slice(0, 3)
                          .map((obj, idx) => (
                            <li key={idx} className="text-gray-600">
                              • {obj}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">
                        Safety Focus:
                      </h4>
                      <ul className="space-y-1">
                        {selectedScenario.safetyFocus
                          .slice(0, 3)
                          .map((focus, idx) => (
                            <li key={idx} className="text-gray-600">
                              • {focus}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Scenario Details */
              <div className="flex-1 p-6">
                {selectedScenario ? (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {selectedScenario.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span
                            className={`px-3 py-1 rounded-full border ${getDifficultyColor(selectedScenario.difficulty)}`}
                          >
                            {selectedScenario.difficulty}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{selectedScenario.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Shield className="w-4 h-4" />
                            <span>{selectedScenario.environment}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                          Learning Objectives
                        </h4>
                        <ul className="space-y-2">
                          {selectedScenario.objectives.map((objective, idx) => (
                            <li
                              key={idx}
                              className="flex items-start space-x-2"
                            >
                              <Target className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                          Safety Focus
                        </h4>
                        <ul className="space-y-2">
                          {selectedScenario.safetyFocus.map((focus, idx) => (
                            <li
                              key={idx}
                              className="flex items-start space-x-2"
                            >
                              <Shield className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{focus}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                          Tools Required
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedScenario.tools.map((tool, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                          Success Criteria
                        </h4>
                        <ul className="space-y-1">
                          {selectedScenario.successCriteria.map(
                            (criteria, idx) => (
                              <li
                                key={idx}
                                className="flex items-start space-x-2"
                              >
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">
                                  {criteria}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <button
                        onClick={() => start3DPreview(selectedScenario)}
                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Monitor className="w-5 h-5" />
                        <span>3D Preview</span>
                      </button>

                      {vrCapabilities?.immersiveVR ? (
                        <button
                          onClick={() => startVRSession(selectedScenario)}
                          disabled={
                            sessionState.isLoading || sessionState.isActive
                          }
                          className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                        >
                          <VrHeadset className="w-5 h-5" />
                          <span>
                            {sessionState.isLoading
                              ? 'Starting...'
                              : 'Start VR Training'}
                          </span>
                        </button>
                      ) : (
                        <div className="flex-1 px-6 py-3 bg-gray-300 text-gray-600 rounded-lg flex items-center justify-center space-x-2">
                          <AlertTriangle className="w-5 h-5" />
                          <span>VR Not Available</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Welcome screen */
                  <div className="text-center py-12">
                    <VrHeadset className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Welcome to VR Training
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Select a training scenario from the sidebar to begin your
                      immersive learning experience.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                      <div className="text-center">
                        <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <h4 className="font-medium text-gray-900 mb-1">
                          Safety First
                        </h4>
                        <p className="text-sm text-gray-600">
                          Practice safety procedures in a risk-free environment
                        </p>
                      </div>
                      <div className="text-center">
                        <Brain className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <h4 className="font-medium text-gray-900 mb-1">
                          Hands-on Learning
                        </h4>
                        <p className="text-sm text-gray-600">
                          Experience realistic scenarios with haptic feedback
                        </p>
                      </div>
                      <div className="text-center">
                        <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <h4 className="font-medium text-gray-900 mb-1">
                          Track Progress
                        </h4>
                        <p className="text-sm text-gray-600">
                          Monitor your skills development and achievements
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Error Display */}
        {sessionState.error && (
          <div className="absolute bottom-4 right-4 max-w-sm bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-800">VR Error</h4>
                <p className="text-sm text-red-600 mt-1">
                  {sessionState.error}
                </p>
                <button
                  onClick={() =>
                    setSessionState(prev => ({ ...prev, error: null }))
                  }
                  className="text-sm text-red-700 hover:text-red-800 mt-2"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default VRTraining;
