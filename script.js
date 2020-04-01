/************************************************************************************************
 *                                                                                              *
 *                              VARIABLES DECLARATION                                           *
 *                                                                                              *
 ************************************************************************************************/
var adIsViewable = true,
  viewabilityTime = 0,
  percentageOfAdVisible = 0,
  adElement = document.getElementById("ad");

/**
 * Logs the viewability values in the console
 *
 * @override
 */
window.log = function () {
  isElementInView(adElement);
  console.log("Ad is viewable: ", adIsViewable, "\nPercentage of ad visibility", percentageOfAdVisible, "\nViewability time of the ad in sec:", viewabilityTime);
};

/************************************************************************************************
 *                                                                                              *
 *                              YOUR IMPLEMENTATION                                             *
 *                                                                                              *
 ************************************************************************************************/

/**
 * adding click lister to the ad element
 */
 adElement.addEventListener("click", function () {
  console.log('clicked on ad');
});

/**
 * 
 * @param {HTMLElement} element Ad element
 * @description prepares actual ad dimensions, gets visible ad dimensions and sends them for visible percentage calculation
 */
var isElementInView = function (element) {
  // returns the size of an element and its position relative to the viewport.
  var elementBoundingBox = element.getBoundingClientRect();
  var actualAdDimensions = {
    width: elementBoundingBox.width,
    height: elementBoundingBox.height
  };
  var visibleAdDimensions = getVisibleAdDimensions(elementBoundingBox);
  calculateVisibleAreaInPercentage(actualAdDimensions, visibleAdDimensions);
}

/**
 * 
 * @param {DOMRect} elementBoundingBox size of an element and its position relative to the viewport.
 * @description calculates the visible ad dimensions and returns
 * @returns object containing height, width of the visible ad area
 */
var getVisibleAdDimensions = function (elementBoundingBox) {
  var visibleAdWidth = elementBoundingBox.x < 0 ? (elementBoundingBox.width + elementBoundingBox.x) : elementBoundingBox.width;
  var visibleAdHeight = elementBoundingBox.y < 0 ? (elementBoundingBox.height + elementBoundingBox.y) : elementBoundingBox.height;
  if (visibleAdHeight < 0 || visibleAdWidth < 0) {
    return { width: 0, height: 0 };
  }
  return {
    width: visibleAdWidth,
    height: visibleAdHeight
  };
}

/**
 * 
 * @param {{height:0, width: 0}} actualAdDimensions 
 * @param {{height:0, width: 0}} visibleAdDimensions 
 * @description calculates the visibility percentage of the ad
 */
var calculateVisibleAreaInPercentage = function (actualAdDimensions, visibleAdDimensions) {
  var areaOfAdVisibile = visibleAdDimensions.height * visibleAdDimensions.width;
  var areaOfActualAd = actualAdDimensions.height * actualAdDimensions.width;
  percentageOfAdVisible = +((areaOfAdVisibile * 100) / areaOfActualAd).toFixed(2);

  // this function will run for every 0.5 second, so adding 0.5 seconds to Viewability time for each iteration based on the visible percentage
  viewabilityTime += percentageOfAdVisible > 0 ? (500 / 1000) : 0;
  adIsViewable = percentageOfAdVisible > 0;
}
