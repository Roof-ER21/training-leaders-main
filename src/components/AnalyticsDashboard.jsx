import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Brain,
  Activity,
  Award,
  AlertTriangle,
  CheckCircle,
  Download,
  RefreshCw,
  Eye,
  MessageSquare,
  Zap,
  Calendar,
} from 'lucide-react';

const AnalyticsDashboard = ({ analytics, userProgress, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // This function will be called from useEffect, so we need to define it outside
  const loadDashboardData = React.useCallback(async () => {
    try {
      const data = analytics.getDashboardData();
      const engagementReport = analytics.getEngagementReport();
      const learningReport = analytics.getLearningProgressReport();
      const performanceReport = analytics.getPerformanceReport();

      setDashboardData({
        realTime: data.realTime,
        quickStats: data.quickStats,
        recentActivity: data.recentActivity,
        reports: {
          engagement: engagementReport,
          learning: learningReport,
          performance: performanceReport,
        },
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  }, [analytics]);

  useEffect(() => {
    if (analytics) {
      loadDashboardData();
    }
  }, [analytics, loadDashboardData]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setTimeout(() => setRefreshing(false), 500);
  };

  const exportData = () => {
    const data = analytics.exportAnalytics();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roofer-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getScoreColor = score => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'learning', label: 'Learning Progress', icon: Brain },
    { id: 'engagement', label: 'Engagement', icon: Activity },
    { id: 'performance', label: 'Performance', icon: Zap },
  ];

  if (!dashboardData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-red-600" />
            <h3 className="text-lg font-semibold mb-2">Loading Analytics</h3>
            <p className="text-gray-600">Preparing your learning insights...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">
                  Learning Analytics Dashboard
                </h2>
                <p className="text-red-100">
                  Advanced insights into your RoofER training progress
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-colors"
              >
                <RefreshCw
                  className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`}
                />
              </button>
              <button
                onClick={exportData}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-colors"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Stats Banner */}
        <div className="bg-gray-50 border-b p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {dashboardData.realTime.sessionDuration}s
              </div>
              <div className="text-sm text-gray-600">Active Session</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {dashboardData.quickStats.totalModulesCompleted}
              </div>
              <div className="text-sm text-gray-600">Modules Completed</div>
            </div>
            <div className="text-center">
              <div
                className={`text-2xl font-bold ${getScoreColor(dashboardData.quickStats.averageScore)}`}
              >
                {dashboardData.quickStats.averageScore}%
              </div>
              <div className="text-sm text-gray-600">Average Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {dashboardData.quickStats.totalAgnesInteractions}
              </div>
              <div className="text-sm text-gray-600">Agnes Interactions</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b bg-white">
          <div className="flex space-x-0">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-red-600 text-red-600 bg-red-50'
                      : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto max-h-[60vh] p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* System Health */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {dashboardData.quickStats.systemHealth}%
                      </div>
                      <div className="text-sm text-green-700">
                        System Health
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {dashboardData.reports.engagement.eventsPerMinute}
                      </div>
                      <div className="text-sm text-blue-700">Events/Min</div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <Eye className="w-8 h-8 text-purple-600" />
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {dashboardData.reports.engagement.activeTimePercentage}%
                      </div>
                      <div className="text-sm text-purple-700">Active Time</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Recent Activity</span>
                  </h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {dashboardData.recentActivity
                      .slice(0, 5)
                      .map((event, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 text-sm"
                        >
                          <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0"></div>
                          <div className="flex-1">
                            <span className="font-medium">
                              {event.type.replace('_', ' ')}
                            </span>
                            {event.data?.moduleId && (
                              <span className="text-gray-600">
                                {' '}
                                - Module {event.data.moduleId}
                              </span>
                            )}
                          </div>
                          <div className="text-gray-500">
                            {new Date(event.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'learning' && (
            <div className="space-y-6">
              {/* Learning Velocity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Learning Velocity</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Modules per Hour:</span>
                      <span className="font-semibold">
                        {dashboardData.reports.learning.learningVelocity
                          ?.modulesPerHour || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Module Time:</span>
                      <span className="font-semibold">
                        {dashboardData.reports.learning.learningVelocity
                          ?.averageModuleTime || 'N/A'}
                        s
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>Achievement Summary</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed Modules:</span>
                      <span className="font-semibold">
                        {dashboardData.reports.learning.completedModules}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Attempts:</span>
                      <span className="font-semibold">
                        {dashboardData.reports.learning.totalAttempts}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Overall Average:</span>
                      <span
                        className={`font-semibold ${getScoreColor(dashboardData.reports.learning.overallAverageScore)}`}
                      >
                        {dashboardData.reports.learning.overallAverageScore}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strongest & Improvement Areas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg border border-green-200 p-6">
                  <h3 className="text-lg font-semibold mb-4 text-green-800">
                    Strongest Areas
                  </h3>
                  <div className="space-y-2">
                    {dashboardData.reports.learning.strongestAreas
                      ?.slice(0, 3)
                      .map((area, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="text-green-700">
                            Module {area.moduleId}
                          </span>
                          <span className="font-semibold text-green-600">
                            {area.averageScore.toFixed(1)}%
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-6">
                  <h3 className="text-lg font-semibold mb-4 text-yellow-800">
                    Improvement Areas
                  </h3>
                  <div className="space-y-2">
                    {dashboardData.reports.learning.improvementAreas
                      ?.slice(0, 3)
                      .map((area, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="text-yellow-700">
                            Module {area.moduleId}
                          </span>
                          <span className="font-semibold text-yellow-600">
                            {area.averageScore.toFixed(1)}%
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'engagement' && (
            <div className="space-y-6">
              {/* Engagement by Feature */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Feature Engagement</span>
                </h3>
                <div className="space-y-4">
                  {Object.entries(
                    dashboardData.reports.engagement.engagementByFeature || {}
                  ).map(([feature, data]) => (
                    <div
                      key={feature}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                        <span className="font-medium capitalize">
                          {feature.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {data.totalInteractions}
                        </div>
                        <div className="text-sm text-gray-600">
                          interactions
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Event Types */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Most Common Activities
                </h3>
                <div className="space-y-3">
                  {dashboardData.reports.engagement.topEventTypes?.map(
                    (event, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="capitalize">
                          {event.type.replace('_', ' ')}
                        </span>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-red-600 h-2 rounded-full"
                              style={{
                                width: `${(event.count / dashboardData.reports.engagement.topEventTypes[0].count) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className="font-semibold w-8">
                            {event.count}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-6">
              {/* Performance Recommendations */}
              {dashboardData.reports.performance.recommendations?.length >
                0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2 text-yellow-800">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Performance Recommendations</span>
                  </h3>
                  <div className="space-y-3">
                    {dashboardData.reports.performance.recommendations.map(
                      (rec, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              rec.priority === 'high'
                                ? 'bg-red-500'
                                : rec.priority === 'medium'
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                            }`}
                          ></div>
                          <div>
                            <div className="font-medium text-yellow-800">
                              {rec.type}
                            </div>
                            <div className="text-yellow-700 text-sm">
                              {rec.message}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Technical Metrics */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Technical Performance
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(
                    dashboardData.reports.performance.technicalMetrics || {}
                  ).map(([metric, data]) => (
                    <div key={metric} className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-medium capitalize mb-2">
                        {metric.replace('_', ' ')}
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Average:</span>
                          <span className="font-semibold">
                            {data.average?.toFixed(2) || 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Min/Max:</span>
                          <span className="font-semibold">
                            {data.min?.toFixed(2) || 'N/A'} /{' '}
                            {data.max?.toFixed(2) || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* UX Score */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">
                  User Experience Score
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`h-4 rounded-full ${
                          dashboardData.reports.performance
                            .userExperienceScore >= 80
                            ? 'bg-green-500'
                            : dashboardData.reports.performance
                                  .userExperienceScore >= 60
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        }`}
                        style={{
                          width: `${dashboardData.reports.performance.userExperienceScore}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold">
                    {dashboardData.reports.performance.userExperienceScore}/100
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
