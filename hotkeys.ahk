#Requires AutoHotkey v2.0
#SingleInstance Force

; ==============================================================================
; PRODUCTIVITY HOTKEYS & Hotstrings SCRIPT (20 Inputs)
; Designed for AutoHotkey v2
; ==============================================================================

TraySetIcon "shell32.dll", 49 ; Set system tray icon to a star/favorite icon

; ==============================================================================
; HELPER UTILITY FUNCTIONS
; ==============================================================================

; #= Windowskey
; ! = Alt
; ^ = Ctrl
; + = Shift]D



GetSelectedText() {
    clipSaved := ClipboardAll()
    A_Clipboard := ""
    Send "^c"

    if ClipWait(0.5) {
        selectedText := A_Clipboard
        A_Clipboard := clipSaved
        return selectedText
    }

    A_Clipboard := clipSaved
    return ""
}

ReplaceSelectedText(newText) {
    clipSaved := ClipboardAll()
    A_Clipboard := newText
    Send "^v"
    Sleep 100
    A_Clipboard := clipSaved
}

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

; 3. Title Case Selected Text (Win + Alt + T)
; Rewrites the highlighted text as Title Case.
#!t:: {
    text := GetSelectedText()
    if (text != "") {
        ReplaceSelectedText(StrTitle(text))
    }
}

; 4. Minimize Active Window (Win + Alt + M)
; Minimizes the currently active window immediately.
#!m:: {
    if WinExist("A") {
        WinMinimize "A"
        ToolTip "Window Minimized", 5,5,1
        SetTimer () => ToolTip(), -5000 ; Hide tooltip after 1.5 seconds
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
::]l::lumpy@primativedna.com

; 8. Email Template Expansion (Type "]email" to expand)
; Feel free to change "your.email@domain.com" to your actual email address.
::]a::alex@psillyfunguy.org

; 8. Email Template Expansion (Type "]email" to expand)
; Feel free to change "your.email@domain.com" to your actual email address.
::]i::x@psillyfunguy.org

; 8. Email Template Expansion (Type "]email" to expand)
; Feel free to change "your.email@domain.com" to your actual email address.
::]e::eiros@primativedna.com


; 10. UPPERCASE Selected Text (Win + U)
; Converts any highlighted text to UPPERCASE.
#l:: {
    text := GetSelectedText()
    if (text != "") {
        clipSaved := ClipboardAll()
        A_Clipboard := StrLower(text)
        Send "^v"
        Sleep 100
        A_Clipboard := clipSaved
    }
}
; 10. UPPERCASE Selected Text (Win + U)
; Converts any highlighted text to UPPERCASE.
#u:: {
    text := GetSelectedText()
    if (text != "") {
        clipSaved := ClipboardAll()
        A_Clipboard := StrTitle(text)
        Send "^v"
        Sleep 100
        A_Clipboard := clipSaved
    }
}

; ------------------------------------------------------------------------------
; CATEGORY 3: SYSTEM UTILITIES & CONTROLS
; ------------------------------------------------------------------------------




; 13 & 14. Volume Control with Mouse Wheel (Shift + WheelUp / WheelDown)
; Quickly raise or lower system volume by holding Shift and scrolling the mouse wheel.
<^XButton1:: Send "{Delete}"
<^XButton2:: Send "{Backspace}"



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


; ------------------------------------------------------------------------------
; CATEGORY 5: QUICK APPLICATION LAUNCHERS
; ------------------------------------------------------------------------------

; 19. Launch Notepad (Win + N)
#n:: Run "notepad.exe"

; 20. Launch PowerShell (Win + P)
#p:: Run "pwsh.exe"

; ==============================================================================
; HELPER UTILITY FUNCTIONS
; ==============================================================================


; Encodes URL inputs (replacing spaces with %20)
EncodeInput(str) {
    return StrReplace(str, " ", "%20")
}
