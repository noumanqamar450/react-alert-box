function scrollToSection(id) {
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
      }
      copyCode = (button) => {
        const codeBlock = button.previousElementSibling;
        navigator.clipboard.writeText(codeBlock.innerText).then(() => {
          button.innerText = "Copied!";
          setTimeout(() => (button.innerText = "Copy"), 2000);
        });
      };
      demoCustomTheme = () => { 
        const style = {
          overlay: { 
            backgroundColor: 'rgba(255, 255, 255, 0.50)'
          },
          box: { 
            backgroundColor: '#ffffff',
            border: '1px solid gray',
            backgroundImage: "unset"
          },
          title: { 
            color: '#ef4444',
            fontWeight: 'bold'
          },
          message: { 
            color: '#334155'
          },
          confirmBtn: { 
            backgroundColor: '#ef4444',
            color: '#ffffff',
            backgroundImage: "unset"
          }
        }
        document.getElementById("demoAlertOverlay").classList.remove("hidden");
        document.getElementById("alertTitle").innerText = "Threat Blocked";
        document.getElementById("alertMessage").innerText = "Packet mitigated.";
        const overlay = document.getElementById("demoAlertOverlay");
        const box = document.getElementById("demoAlertBox");
        const title = document.getElementById("alertTitle");
        const message = document.getElementById("alertMessage");
        const confirmBtn = document.getElementById("confirmBtn");
        

        Object.assign(overlay.style, style.overlay);
        Object.assign(box.style, style.box);
        Object.assign(title.style, style.title);
        Object.assign(message.style, style.message);
        Object.assign(confirmBtn.style, style.confirmBtn);
      }
      demoAsyncAlert = () => {
        document.getElementById("demoAlertOverlay").classList.remove('hidden')
        document.getElementById("alertTitle").innerText = "Purging Cluster...";
        document.getElementById("alertMessage").innerText = "This will disconnect all clients and cannot be undone.";
        document.getElementById("confirmBtnText").innerText = "Purge Cluster";
        document.getElementById("confirmBtn").setAttribute("disabled", "true");
        const loaderIcon = document.getElementById("loaderIcon");
        loaderIcon.classList.remove("hidden");
        setTimeout(() => {
          loaderIcon.classList.add("hidden");
          document.getElementById("alertTitle").innerText = "Success!";
          document.getElementById("alertMessage").innerText = "Cluster purged successfully.";
          document.getElementById("confirmBtnText").innerText = "Close";
          document.getElementById("confirmBtn").removeAttribute("disabled");
        }, 3000);


      }
      demoSimpleAlert = () => {
        document.getElementById("demoAlertOverlay").classList.remove("hidden");
        document.getElementById("alertTitle").innerText = "Discard Draft?";
        document.getElementById("alertMessage").innerText =
          "Are you sure you want to discard your changes?";
        document.getElementById("confirmBtnText").innerText = "Discard";
      }
      closeAlert = () => {
        document.getElementById("demoAlertOverlay").classList.add("hidden");
        document.getElementById("alertTitle").innerText = "";
        document.getElementById("alertMessage").innerText = "";
        document.getElementById("confirmBtnText").innerText = "";
        document.getElementById("confirmBtn").removeAttribute("disabled");
        document.getElementById("loaderIcon").classList.add("hidden");
        document.getElementById("demoAlertOverlay").style = "";
        document.getElementById("demoAlertBox").style = "";
        document.getElementById("alertTitle").style = "";
        document.getElementById("alertMessage").style = "";
        document.getElementById("confirmBtn").style = "";
      }