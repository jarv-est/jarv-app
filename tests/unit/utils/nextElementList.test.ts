import nextElementList from "@/utils/nextElementList.js";

describe("nextElementList", ()=>{
  it("locates element in list and returns the next element", ()=>{
    const list = ["A", "B", "C", "D", "E"];
    const value = "C";
    const result = nextElementList(list, value);
    expect(result).toBe("D");
  });
  
  describe("when element is at the end of the list", ()=>{
    it("locates next element at start of list", ()=>{
      const list = ["A", "B", "C", "D", "E"];
      const value = "E";
      const result = nextElementList(list, value);
      expect(result).toBe("A");
    });
  });
});