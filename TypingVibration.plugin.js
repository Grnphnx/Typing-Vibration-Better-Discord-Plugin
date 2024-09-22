/**
 * @name TypingVibrationPlugin
 * @description A silly little plugin that makes almost everything vibrate as you text. Nothing more. :)
 * @version 1.0.0
 * @author Grnphnx
 */

module.exports = class TypingVibrationPlugin {
    constructor() {
      this.typingSpeed = 0;
      this.vibrationIntensity = BdApi.loadData('TypingVibrationPlugin', 'vibrationIntensity') || 5; // Default intensity
      this.typingTimeout = null;
    }
  
    start() {
      console.log('TypingVibrationPlugin started');
      this.addTypingListener();
    }
  
    stop() {
      console.log('TypingVibrationPlugin stopped');
      this.removeTypingListener();
      this.resetElements();
    }
  
    getSettingsPanel() {
      const panel = document.createElement('div');
      panel.style.padding = '10px';
  
      const label = document.createElement('label');
      label.textContent = 'Vibration Intensity:';
      label.style.backgroundColor = 'white';
      label.style.fontWeight = 'bold';
      label.style.padding = '5px';
      label.style.borderRadius = '5px';
  
      const input = document.createElement('input');
      input.type = 'range';
      input.min = '1';
      input.max = '10';
      input.value = this.vibrationIntensity;
      input.addEventListener('input', (e) => {
        this.vibrationIntensity = e.target.value;
        BdApi.saveData('TypingVibrationPlugin', 'vibrationIntensity', this.vibrationIntensity);
      });
  
      panel.appendChild(label);
      panel.appendChild(input);
  
      return panel;
    }
  
    addTypingListener() {
      console.log('Adding typing listener');
      document.addEventListener('keydown', this.handleTyping.bind(this));
    }
  
    removeTypingListener() {
      console.log('Removing typing listener');
      document.removeEventListener('keydown', this.handleTyping.bind(this));
    }
  
    handleTyping() {
      console.log('Key pressed');
      clearTimeout(this.typingTimeout);
      this.typingSpeed++;
      this.applyVibration();
  
      this.typingTimeout = setTimeout(() => {
        this.typingSpeed = 0;
        this.resetElements();
      }, 100); // Reduced delay to 100ms
    }
  
    applyVibration() {
      console.log('Applying vibration');
      const selectors = [
        'div.wrapper_c51b4e', 
        'div.wrapper_f90abb', 
        'div.folder_bc7085', 
        'div.message_d5deea', 
        'div.cozyMessage_d5deea', 
        'div.groupStart_d5deea', 
        'div.wrapper_f9f2ca', 
        'div.cozy_f9f2ca', 
        'div.zalgo_f9f2ca'
      ];
      const elements = document.querySelectorAll(selectors.join(', '));
      console.log('Found elements:', elements.length);
      elements.forEach(element => {
        element.style.transition = 'transform 0.1s';
        element.style.transform = `translate(${Math.random() * this.vibrationIntensity - this.vibrationIntensity / 2}px, ${Math.random() * this.vibrationIntensity - this.vibrationIntensity / 2}px)`;
      });
    }
  
    resetElements() {
      console.log('Resetting elements');
      const selectors = [
        'div.wrapper_c51b4e', 
        'div.wrapper_f90abb', 
        'div.folder_bc7085', 
        'div.message_d5deea', 
        'div.cozyMessage_d5deea', 
        'div.groupStart_d5deea', 
        'div.wrapper_f9f2ca', 
        'div.cozy_f9f2ca', 
        'div.zalgo_f9f2ca'
      ];
      const elements = document.querySelectorAll(selectors.join(', '));
      elements.forEach(element => {
        element.style.transition = 'none';
        element.style.transform = '';
      });
    }
  };
  
