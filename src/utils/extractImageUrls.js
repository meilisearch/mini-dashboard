/**
 * Extracts all potential image URLs from a JSON document object.
 *
 * @param {any} documentObject - The JSON object to search for image URLs
 * @returns {string[]} Array of unique image URLs found in the document
 */
export default function extractImageUrls(documentObject) {
  // Handle null, undefined, or non-object inputs
  if (!documentObject || typeof documentObject !== 'object') {
    return []
  }

  const imageUrls = new Set() // Use Set to automatically handle uniqueness

  // Regular expression patterns for image URLs
  const imageExtensionPattern = /\.(png|jpg|jpeg|gif|webp|svg)(\?.*)?$/i
  const dataImagePattern = /^data:image\//i

  /**
   * Recursively traverses an object to find image URLs
   * @param {any} obj - Current object/value being processed
   */
  function traverse(obj) {
    // Handle null or undefined
    if (obj === null || obj === undefined) {
      return
    }

    // If it's a string, check if it's an image URL
    if (typeof obj === 'string') {
      const trimmedStr = obj.trim()

      // Check for common image file extensions
      if (imageExtensionPattern.test(trimmedStr)) {
        imageUrls.add(trimmedStr)
      }
      // Check for data:image/ URLs (base64 encoded images)
      else if (dataImagePattern.test(trimmedStr)) {
        imageUrls.add(trimmedStr)
      }
      return
    }

    // If it's an array, traverse each element
    if (Array.isArray(obj)) {
      obj.forEach((item) => traverse(item))
      return
    }

    // If it's an object, traverse each property value
    if (typeof obj === 'object') {
      Object.values(obj).forEach((value) => traverse(value))
    }

    // For primitive types (number, boolean, etc.), do nothing
  }

  // Start the traversal
  traverse(documentObject)

  // Convert Set back to Array and return
  return Array.from(imageUrls)
}
