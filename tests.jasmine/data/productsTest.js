import { Product,Clothing,Appliance } from "../../data/products.js";




describe('test suite: Product test', () => {
  it('product class is valid', () => {
    const productMe = new Product ({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: [
        "socks",
        "sports",
        "apparel"
      ]
    })
    expect(productMe.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")

    expect(productMe.getPrice()).toEqual('$10.90')

    expect(productMe.extraInfoAboutClothingHTML()).toEqual('')

    });

   
  });

  describe('clothing test', () => {
    it('clothing tests are valid', () => {
    const chainz = new Clothing ( {
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799,
      keywords: [
        "tshirts",
        "apparel",
        "mens"
      ],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png"
    })
    expect(chainz.extraInfoAboutClothingHTML()).toContain('Size')
    })
  })


