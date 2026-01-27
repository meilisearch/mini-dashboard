import extractFirstImageUrl from './extractFirstImageUrls'

describe('extractFirstImageUrl', () => {
  test('should extract image URL from simple object', () => {
    const input = { image: 'http://example.com/image.png' }
    const result = extractFirstImageUrl(input)
    expect(result).toBe('http://example.com/image.png')
  })

  test('should extract image URLs from nested object', () => {
    const input = {
      details: {
        mainImage: 'http://example.com/photo.jpg',
        description: 'A beautiful photo',
      },
    }
    const result = extractFirstImageUrl(input)
    expect(result).toBe('http://example.com/photo.jpg')
  })

  test('should extract the first image URL from array', () => {
    const input = {
      gallery: ['img1.gif', 'http://example.com/img2.webp'],
    }
    const result = extractFirstImageUrl(input)
    expect(result).toBe('img1.gif')
  })

  test('should extract first image from object', () => {
    const input = {
      images: {
        png: 'http://example.com/image.png',
        jpg: 'http://example.com/photo.jpg',
        jpeg: 'http://example.com/picture.jpeg',
        gif: 'http://example.com/animation.gif',
        webp: 'http://example.com/modern.webp',
        svg: 'http://example.com/vector.svg',
      },
    }
    const result = extractFirstImageUrl(input)
    expect(result).toBe('http://example.com/image.png')
  })

  test('should handle mixed content including non-URL strings', () => {
    const input = {
      title: 'My Article',
      content: 'This is some text content',
      image: 'http://example.com/article.png',
      author: 'John Doe',
      tags: ['tech', 'programming'],
    }
    const result = extractFirstImageUrl(input)
    expect(result).toBe('http://example.com/article.png')
  })

  test('should extract data:image URLs', () => {
    const input = {
      avatar:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
      name: 'User',
    }
    const result = extractFirstImageUrl(input)
    expect(result).toBe(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
    )
  })

  test('should return null when no image URLs found', () => {
    const input = {
      title: 'Article Title',
      content: 'Some text content',
      author: 'John Doe',
      tags: ['tech', 'programming'],
      metadata: {
        created: '2023-01-01',
        views: 100,
      },
    }
    const result = extractFirstImageUrl(input)
    expect(result).toBeNull()
  })

  test('should handle null input gracefully', () => {
    const result = extractFirstImageUrl(null)
    expect(result).toBeNull()
  })

  test('should handle undefined input gracefully', () => {
    const result = extractFirstImageUrl(undefined)
    expect(result).toBeNull()
  })

  test('should handle non-object input gracefully', () => {
    expect(extractFirstImageUrl('string')).toBeNull()
    expect(extractFirstImageUrl(123)).toBeNull()
    expect(extractFirstImageUrl(true)).toBeNull()
  })

  test('should handle URLs with query parameters', () => {
    const input = {
      thumbnail: 'http://example.com/thumb.jpg?size=small&quality=80',
      fullsize: 'http://example.com/full.png?width=1920&height=1080',
    }
    const result = extractFirstImageUrl(input)
    expect(result).toBe('http://example.com/thumb.jpg?size=small&quality=80')
  })

  test('should handle deeply nested objects', () => {
    const input = {
      level1: {
        level2: {
          level3: {
            level4: {
              deepImage: 'http://example.com/deep.jpg',
            },
          },
        },
      },
    }
    const result = extractFirstImageUrl(input)
    expect(result).toBe('http://example.com/deep.jpg')
  })

  test('should handle arrays within nested objects', () => {
    const input = {
      article: {
        content: {
          sections: [
            {
              type: 'text',
              value: 'Some text',
            },
            {
              type: 'image',
              value: 'http://example.com/section1.png',
            },
            {
              type: 'gallery',
              images: [
                'http://example.com/gallery1.jpg',
                'http://example.com/gallery2.jpg',
              ],
            },
          ],
        },
      },
    }
    const result = extractFirstImageUrl(input)
    expect(result).toBe('http://example.com/section1.png')
  })

  test('should handle case-insensitive file extensions', () => {
    const input = {
      mixedCase: 'http://example.com/Photo.JpG',
    }
    const result = extractFirstImageUrl(input)
    expect(result).toBe('http://example.com/Photo.JpG')
  })

  test('should respect MAX_DEPTH limit and stop traversal at maximum depth', () => {
    const input = {
      level1: {
        level2: {
          level3: {
            level4: {
              level5: {
                level6: {
                  level7: {
                    level8: {
                      level9Image: 'http://example.com/level9.jpg',
                      level9: {
                        level10Image: 'http://example.com/level10.jpg',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    }
    const result = extractFirstImageUrl(input)
    expect(result).toBe('http://example.com/level9.jpg')
  })
})
