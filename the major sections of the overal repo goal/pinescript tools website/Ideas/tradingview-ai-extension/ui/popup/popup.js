// ============================================================================
// Popup Script
// ============================================================================

document.addEventListener('DOMContentLoaded', async () => {
  const apiKeyInput = document.getElementById('api-key');
  const saveButton = document.getElementById('save-key');
  const statusDiv = document.getElementById('key-status');

  // Load current API key
  chrome.storage.local.get('anthropic_api_key', (result) => {
    if (result.anthropic_api_key) {
      apiKeyInput.value = result.anthropic_api_key.substring(0, 10) + '...';
      apiKeyInput.type = 'text';
      apiKeyInput.disabled = true;
      saveButton.textContent = 'Update API Key';
      
      // Add clear button
      const clearBtn = document.createElement('button');
      clearBtn.textContent = 'Clear';
      clearBtn.style.background = '#ef4444';
      clearBtn.style.marginTop = '8px';
      clearBtn.onclick = () => {
        chrome.storage.local.remove('anthropic_api_key', () => {
          apiKeyInput.value = '';
          apiKeyInput.type = 'password';
          apiKeyInput.disabled = false;
          saveButton.textContent = 'Save API Key';
          clearBtn.remove();
          showStatus('API key cleared', 'success');
        });
      };
      saveButton.parentNode.insertBefore(clearBtn, saveButton.nextSibling);
    }
  });

  // Save API key
  saveButton.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    
    if (!apiKey) {
      showStatus('Please enter an API key', 'error');
      return;
    }

    if (!apiKey.startsWith('sk-ant-')) {
      showStatus('Invalid API key format', 'error');
      return;
    }

    chrome.storage.local.set({ anthropic_api_key: apiKey }, () => {
      showStatus('API key saved successfully!', 'success');
      apiKeyInput.value = apiKey.substring(0, 10) + '...';
      apiKeyInput.type = 'text';
      apiKeyInput.disabled = true;
      saveButton.textContent = 'Update API Key';
    });
  });

  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.style.display = 'block';
    
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 3000);
  }
});

