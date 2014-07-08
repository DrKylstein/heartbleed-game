function HeartbleedGame(soundManager) {
    this.m_soundManager = soundManager;
    this.m_tries = 0;
    this.m_correctPassword = '';
    this.m_won = false;
    this.onMessage = function(str){};
    this.onReset = function(){};
    this.onTriesChange = function(num){};
}

HeartbleedGame.prototype.reset = function HeartbleedGame_reset() {
    //TODO
}

HeartbleedGame.prototype.tryItem = function HeartbleedGame_tryItem(index) {
    //TODO
}

