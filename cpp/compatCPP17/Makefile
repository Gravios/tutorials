CXX = g++
CXXFLAGS = -std=c++17 -Wall
OBJECTS = compat.o

default: compat

%.o : %.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

compat: $(OBJECTS)
	$(CXX)  $(OBJECTS) -o $@

clean:
	-rm -f $(OBJECTS)
	-rm -f compat

