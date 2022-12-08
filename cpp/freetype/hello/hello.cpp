#include <iostream>
#include <ft2build.h>

#include FT_FREETYPE_H




int main()
{
  int error {0};

  FT_Library library;

  error = FT_Init_FreeType( &library );
  if (error)
    {
      std::cout << "error\n";
    }
  else
    {
      std::cout << "FreeType2 loaded ...\n";
    }

}
