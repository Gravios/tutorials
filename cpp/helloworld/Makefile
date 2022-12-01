OBJECTS = hello.o

default: hello

%.o : %.cpp
	g++ -c $< -o $@

hello: $(OBJECTS)
	g++ $(OBJECTS) -o $@

clean:
	-rm -f $(OBJECTS)
	-rm -f hello
