const healthService = require('../services/health');

class HealthController {
  /**
   * PUBLIC_INTERFACE
   * check
   * Health check endpoint to verify service status.
   */
  check(req, res) {
    const healthStatus = healthService.getStatus();
    return res.status(200).json(healthStatus);
  }
}

module.exports = new HealthController();
