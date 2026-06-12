#Requires AutoHotkey v2.0
#SingleInstance Force

; ==============================================================================
; PRODUCTIVITY HOTKEYS & HOTSTRINGS SCRIPT (20 Inputs)
; Designed for AutoHotkey v2
; ==============================================================================

TraySetIcon "shell32.dll", 44 ; Set system tray icon to a star/favorite icon

; ------------------------------------------------------------------------------
; CATEGORY 1: WINDOW MANAGEMENT & CONTROL
; ------------------------------------------------------------------------------

; 1. Always on Top Toggle (Win + T)
; Toggles the active window to stay on top of all other windows.
#t:: {
    WinSetAlwaysOnTop -1, "A"
    ToolTip "Always on Top Toggled"
    SetTimer () => ToolTip(), -1500 ; Hide tooltip after 1.5 seconds
    
}

; 2. Center Active Window (Win + Alt + C)
; Centers the currently active window on the primary screen.
#!c:: {
    activeWin := "A"
    if WinExist(activeWin) {
        WinGetPos &X, &Y, &W, &H, activeWin
        monitorIndex := MonitorGetPrimary()
        MonitorGetWorkArea monitorIndex, &Left, &Top, &Right, &Bottom
        newX := Left + ((Right - Left - W) / 2)
        newY := Top + ((Bottom - Top - H) / 2)
        WinMove newX, newY,,, activeWin
    }
}

; 3. Toggle Window Transparency (Win + Alt + T)
; Toggles transparency (opacity of 200/255) for the active window.
#!t:: {
    activeWin := "A"
    trans := WinGetTransparent(activeWin)
    if (trans = "") {
        WinSetTransparent 200, activeWin
        ToolTip "Transparency Enabled (80% Opacity)"
    } else {
        WinSetTransparent "Off", activeWin
        ToolTip "Transparency Disabled"
    }
    SetTimer () => ToolTip(), -1500
}

; 4. Minimize Active Window (Win + Alt + M)
; Minimizes the currently active window immediately.
#!m:: {
    if WinExist("A") {
        WinMinimize "A"
    }
}

; 5. Maximize / Restore Toggle (Win + Alt + Up/Down)
; Maximize or Restore the active window.
#!Up:: {
    if WinExist("A") {
        WinMaximize "A"
    }
}
#!Down:: {
    if WinExist("A") {
        WinRestore "A"
    }
}

; ------------------------------------------------------------------------------
; CATEGORY 2: TEXT EXPANSION & HOTSTRINGS
; ------------------------------------------------------------------------------

; 6. Type Current Date (Type "]d" to expand)
; Expands to current date in YYYY-MM-DD format.
::]d:: {
    SendInput FormatTime(, "yyyy-MM-dd")
}

; 7. Type Current Time (Type "]t" to expand)
; Expands to current time in HH:MM AM/PM format.
::]t:: {
    SendInput FormatTime(, "hh:mm tt")
}

; 8. Email Template Expansion (Type "]email" to expand)
; Feel free to change "your.email@domain.com" to your actual email address.
::]email::your.email@domain.com

; 9. Clean Paste as Plain Text (Win + Ctrl + Shift + V)
; Pastes clipboard content stripped of any formatting.
#^+v:: {
    clipSaved := A_Clipboard
    A_Clipboard := A_Clipboard ; Strip formatting
    Send "^v"
    Sleep 100
    A_Clipboard := clipSaved
}

; 10. UPPERCASE Selected Text (Win + U)
; Converts any highlighted text to UPPERCASE.
#u:: {
    text := GetSelectedText()
    if (text != "") {
        clipSaved := ClipboardAll()
        A_Clipboard := StrUpper(text)
        Send "^v"
        Sleep 100
        A_Clipboard := clipSaved
    }
}

; ------------------------------------------------------------------------------
; CATEGORY 3: SYSTEM UTILITIES & CONTROLS
; ------------------------------------------------------------------------------

; 11. Empty Recycle Bin (Win + Shift + Delete)
; Empties the Windows Recycle Bin without showing the confirmation dialog.
#+Del:: {
    try {
        FileRecycleEmpty
        ToolTip "Recycle Bin Emptied"
    } catch {
        ToolTip "Recycle Bin is already empty"
    }
    SetTimer () => ToolTip(), -1500
}

; 12. Lock PC & Turn Off Screens (Win + Shift + L)
; Locks the PC and immediately puts all screens to sleep.
#+l:: {
    DllCall("LockWorkStation")
    Sleep 1000
    SendMessage 0x0112, 0xF170, 2,, "Program Manager" ; WM_SYSCOMMAND, SC_MONITORPOWER, POWER_OFF
}

; 13 & 14. Volume Control with Mouse Wheel (Shift + WheelUp / WheelDown)
; Quickly raise or lower system volume by holding Shift and scrolling the mouse wheel.
+WheelUp:: Send "{Volume_Up}"
+WheelDown:: Send "{Volume_Down}"

; 15. CapsLock to Backspace Remap (CapsLock)
; Remaps CapsLock to work as Backspace (prevents accidental capital lockups).
; To toggle actual CapsLock, press Shift + CapsLock.
+CapsLock:: {
    state := GetKeyState("CapsLock", "T")
    if state
        SetCapsLockState "AlwaysOff"
    else
        SetCapsLockState "AlwaysOn"
}
CapsLock:: Send "{Backspace}"

; ------------------------------------------------------------------------------
; CATEGORY 4: HIGHLIGHT & WEB SEARCH SHORTCUTS
; ------------------------------------------------------------------------------

; 16. Search Highlighted Text on Google (Win + G)
#g:: {
    text := GetSelectedText()
    if (text != "") {
        Run "https://www.google.com/search?q=" . EncodeInput(text)
    }
}

; 17. Search Highlighted Text on YouTube (Win + Y)
#y:: {
    text := GetSelectedText()
    if (text != "") {
        Run "https://www.youtube.com/results?search_query=" . EncodeInput(text)
    }
}

; 18. Search Highlighted Text on Wikipedia (Win + W)
#w:: {
    text := GetSelectedText()
    if (text != "") {
        Run "https://en.wikipedia.org/wiki/Special:Search?search=" . EncodeInput(text)
    }
}

; ------------------------------------------------------------------------------
; CATEGORY 5: QUICK APPLICATION LAUNCHERS
; ------------------------------------------------------------------------------

; 19. Launch Notepad (Win + N)
#n:: Run "notepad.exe"

; 20. Launch PowerShell (Win + P)
#p:: Run "powershell.exe"

; ==============================================================================
; HELPER UTILITY FUNCTIONS
; ==============================================================================

; Copies highlighted text to clipboard and returns it without breaking clipboard history
GetSelectedText() {
    clipSaved := ClipboardAll()
    A_Clipboard := ""
    Send "^c"
    if !ClipWait(0.5) {
        A_Clipboard := clipSaved
        return ""
    }
    text := A_Clipboard
    A_Clipboard := clipSaved
    return text
}

; Encodes URL inputs (replacing spaces with %20)
EncodeInput(str) {
    return StrReplace(str, " ", "%20")
}
