#include <iostream>

int get_value_from_user() // example function
{
  std::cout << "Enter a number: ";
  int input{};
  std::cin >> input;
  return input;\
}

int main()
{
  int x{get_value_from_user()};
  int y{get_value_from_user()};

  std::cout << x << " + " << y << " = " << x + y << '\n';
  
  return 0;
}
