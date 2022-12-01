/***************************************************************
 * Name:      wxwApp.h
 * Purpose:   Defines Application Class
 * Author:    Justin Graboski ()
 * Created:   2022-11-26
 * Copyright: Justin Graboski ()
 * License:
 **************************************************************/

#ifndef WXWAPP_H
#define WXWAPP_H

#include <wx/app.h>

class wxwApp : public wxApp
{
    public:
        virtual bool OnInit();
};

#endif // WXWAPP_H
