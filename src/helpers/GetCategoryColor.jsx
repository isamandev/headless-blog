const categoryColorMap = new Map();

categoryColorMap.set("Product Reviews", "orange");
categoryColorMap.set("Opinions", "green");
categoryColorMap.set("Travel Guides", "purple");

function GetCategoryColor(category) {
  return categoryColorMap.get(category);
}

export default GetCategoryColor;
