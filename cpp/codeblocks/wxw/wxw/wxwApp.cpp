/***************************************************************
 * Name:      wxwApp.cpp
 * Purpose:   Code for Application Class
 * Author:    Justin Graboski ()
 * Created:   2022-11-26
 * Copyright: Justin Graboski ()
 * License:
 **************************************************************/

#ifdef WX_PRECOMP
#include "wx_pch.h"
#endif

#ifdef __BORLANDC__
#pragma hdrstop
#endif //__BORLANDC__

#include "wxwApp.h"
#include "wxwMain.h"

IMPLEMENT_APP(wxwApp);

bool wxwApp::OnInit()
{
    wxwFrame* frame = new wxwFrame(0L, _("wxWidgets Application Template"));
    
    frame->Show();
    
    return true;
}
