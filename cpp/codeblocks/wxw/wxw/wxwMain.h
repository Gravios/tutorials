/***************************************************************
 * Name:      wxwMain.h
 * Purpose:   Defines Application Frame
 * Author:    Justin Graboski ()
 * Created:   2022-11-26
 * Copyright: Justin Graboski ()
 * License:
 **************************************************************/

#ifndef WXWMAIN_H
#define WXWMAIN_H

#ifndef WX_PRECOMP
    #include <wx/wx.h>
#endif

#include "wxwApp.h"

class wxwFrame: public wxFrame
{
    public:
        wxwFrame(wxFrame *frame, const wxString& title);
        ~wxwFrame();
    private:
        enum
        {
            idMenuQuit = 1000,
            idMenuAbout
        };
        void OnClose(wxCloseEvent& event);
        void OnQuit(wxCommandEvent& event);
        void OnAbout(wxCommandEvent& event);
        DECLARE_EVENT_TABLE()
};


#endif // WXWMAIN_H
