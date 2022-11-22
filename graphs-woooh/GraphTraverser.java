import java.util.ArrayList;

public class GraphTraverser {

    public static void depthFirstTraversal(Vertex start, ArrayList<Vertex> visitedVertices){
        System.out.println(start.getData());

        for (Edge e: start.getEdges()) {
            Vertex neighbor = e.getEnd();

            if (!visitedVertices.contains(neighbor)){
                visitedVertices.add(neighbor);
                GraphTraverser.depthFirstTraversal(neighbor,visitedVertices);
            }
        }
    }
    public static void main(String[] args) {
        
    }
    
}
