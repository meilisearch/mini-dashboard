const MAX_DEPTH = 10

/**
 * Extracts the first image URL from a JSON document object.
 *
 * @param {any} documentObject - The JSON object to search for image URLs
 * @returns {string|null} The first image URL found in the document (or null if none found)
 */
export default function extractFirstImageUrl(documentObject) {
  // Handle null, undefined, or non-object inputs
  if (!documentObject || typeof documentObject !== 'object') {
    return null
  }

  // Regular expression patterns for image URLs
  const imageExtensionPattern = /\.(png|jpg|jpeg|gif|webp|svg)(\?.*)?$/i
  const dataImagePattern = /^data:image\//i

  /**
   * Recursively traverses an object to find the first image URL
   * @param {any} obj - Current object/value being processed
   * @param {number} depth - Current depth in the object hierarchy
   * @returns {string|null} The first image URL found, or null if none found
   */
  function traverse(obj, depth = 0) {
    // Stop traversal if we've reached maximum depth
    if (depth >= MAX_DEPTH) {
      return null
    }

    // Handle null or undefined
    if (obj === null || obj === undefined) {
      return null
    }

    // If it's a string, check if it's an image URL
    if (typeof obj === 'string') {
      const trimmedStr = obj.trim()

      // Check for common image file extensions
      if (imageExtensionPattern.test(trimmedStr)) {
        return trimmedStr
      }
      // Check for data:image/ URLs (base64 encoded images)
      if (dataImagePattern.test(trimmedStr)) {
        return trimmedStr
      }
      return null
    }

    // If it's an array, traverse each element
    if (Array.isArray(obj)) {
      let result = null
      obj.some((item) => {
        result = traverse(item, depth + 1)
        return result !== null
      })
      return result
    }

    // If it's an object, traverse each property value
    if (typeof obj === 'object') {
      let result = null
      Object.values(obj).some((value) => {
        result = traverse(value, depth + 1)
        return result !== null
      })
      return result
    }

    // For primitive types (number, boolean, etc.), return null
    return null
  }

  return traverse(documentObject)
}
