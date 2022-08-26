##
# Execute this script once to create the database & table
# as well as populating it with initial data
#

import sqlite3
db = sqlite3.connect('assignmentdb.sqlite')

db.execute('DROP TABLE IF EXISTS products')
db.execute('DROP TABLE IF EXISTS carts')

db.execute('''CREATE TABLE IF NOT EXISTS products(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name text NOT NULL, 
    image text NOT NULL, 
    price text NOT NULL, 
    category text NOT NULL, 
    description text NOT NULL
    )''')

db.execute('''CREATE TABLE IF NOT EXISTS carts(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text NOT NULL, 
    image text NOT NULL, 
    price text NOT NULL,
    quantity text NOT NULL
    )''')

cursor = db.cursor()

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX ASTROX 99 PRO','https://vsmash.com/wp-content/uploads/2021/09/Add-a-subheading-8.png','709.90','Racquet','Item Code: AX99-P \n\nFlex: Stiff \n\nFrame: HM Graphite / Namd / VOLUME CUT RESIN / Tungsten \n\nShaft: HM Graphite / Namd \n\nLength: 10 mm longer \n\nWeight / Grip 4U (Ave.83g) G5 \n\nColors: White Tiger, Cherry Sunburst \n\nMade In Japan')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX ASTROX 88 D PRO','https://vsmash.com/wp-content/uploads/2021/03/Untitled-design-2021-08-12T172108.432.png','679.90','Racquet','Item Code: AX88D-P \n\nFlex: Stiff Frame: HM Graphite / VOLUME CUT RESIN / Tungsten \n\nShaft: HM Graphite / Namd \n\nLength: 10 mm longer \n\nWeight Grip Size: 4U (Ave.83g) G5 \n\nColor: Camel Gold \n\nMade In Japan')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX NANOFLARE 700','https://vsmash.com/wp-content/uploads/2022/01/1231212.png','629.90','Racquet','Item Code: NF-700 \n\nFlex: MEDIUM \n\nFrame: H.M. Graphite / M40X / SUPER HMG \n\nShaft: H.M. Graphite \n\nWeight / Grip Size: 4U (Ave.83g) G5 \n\nColour: Cyan \n\nMade in Japan')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX DUORA 10','https://vsmash.com/wp-content/uploads/2019/01/Untitled-design-2021-08-13T122140.052.png','549.90','Racquet','Item Code: DUO10 \n\nFlex: Stiff \n\nFrame: H.M. Graphite, NANOMETRIC DR, Ni-Ti Fiber \n\nShaft: H.M. Graphite, NANOMETRIC \n\nWeight / Grip Size: 3U (Ave.88g) G5 \n\nColour: Blue/Orange \n\nMade in Japan')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX ARCSABER 7 PRO','https://vsmash.com/wp-content/uploads/2022/08/3.png','679.90','Racquet','Item Code: ARC7-P \n\nFlex: Medium \n\nFrame :HM Graphite / POCKETING BOOSTER \n\nShaft Composition :HM Graphite / Ultra PE FIBER \n\nJoint :NEW Built-in T-Joint / T-ANCHOR \n\nLength: 10 mm longer \n\nWeight / Grip: 4U (Avg. 83g) G5 \n\nColor(s): Gray / Yellow \n\nMade in Japan')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX JAPAN GRIPS AC102-5P','https://vsmash.com/wp-content/uploads/2018/08/AC102-5P-011_01.jpg','69.00','Accessories','Width: 25mm \n\nLength: 1200mm \n\nThickness: 0.6mm \n\nMaterial: Polyurethane')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX JAPAN STRING EXBOLT 63','https://vsmash.com/wp-content/uploads/2021/04/Untitled-design-2021-08-11T155830.484.png','53.00','Accessories','Quick Repulsion \n\nMaterial: High-Intensity Multifilament Nylon \n\nLength: 10m/33ft \n\nGauge: 0.63mm \n\nMade in Japan')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX JAPAN TOWEL AC1055 SPORTS TOWEL','https://vsmash.com/wp-content/uploads/2021/03/1055.png','89.00','Accessories','Features: Full-scale athlete specifications with high water absorption, high water supply, and high durability \n\nDimension: 40*100cm \n\nMaterial: 100% cotton (olympia cotton) \n\nFunction: High water absorption, high water supply, high durability \n\nColour: Blue Green \n\nMade in Japan')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX SHUTTLECOCK AEROSENSA 30','https://vsmash.com/wp-content/uploads/2018/08/AS-30_01.jpg','100.00','Accessories','YONEX Feather Shuttlecocks are precision-manufactured to ensure the correct speed, distance and stability performance')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX DUAL WALL VACUUM BOTTLE TB550 BLACK','https://vsmash.com/wp-content/uploads/2020/11/Bottle-Black.png','46.00','Accessories','Capacity : 550ML \n\nBPA free \n\nSuitable for hot&cold water')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX PRO TROLLEY BAG 92232EX','https://vsmash.com/wp-content/uploads/2022/02/ba92232_fabl.png','639.90','Bag','Colour: Fine Blue \n\nSize: 80 x 36 x 34 cm')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX PRO TOURNAMENT BAG 2201W','https://vsmash.com/wp-content/uploads/2022/02/92331W-5.png','449.00','Bag','Colour: Black, Navy Saxe, Tango Red, Fine Blue \n\nShoe pocket -Shoes can be packed away in the bag \n\nSize: 75 x 19 x 33 cm \n\nMaterial: 100% Polyester')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX PRO BACKPACK S 92312SEX','https://vsmash.com/wp-content/uploads/2022/05/9236_GO_1653017959709.jpg','439.90','Bag','Colour: Grayish Pearl \n\nSize: 31 x 20.5 x 47 cm (26L) \n\nMaterial: 100% Polyester')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX ACTIVE BACKPACK 82212TEX','https://vsmash.com/wp-content/uploads/2022/02/82212tex1b2.jpg','419.90','Bag','Dimension:30 x 20 x 51cm \n\nColour: Gray \n\nCompartments: 1x Racquet Compartment(foldable), 1x Main Compartment, 1 x small front compartment, 2 x side pockets \n\nMaterial: 100% Polyester')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX PRO BACKPACK M 92212MEX','https://vsmash.com/wp-content/uploads/2022/02/92312M-4.png','399.90','Bag','Colour: Black, Fine Blue \n\nSize: 31 x 20.5 x 47 cm (26L) \n\nMaterial: 100% Polyester \n\nFeatures: 2 adjustable backpack strap, 1 x hand carry holder(top), Chest Belt, Water Bottle Pocket, Shoe Pocket')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX POWER CUSHION 65Z3 MEN WHITE TIGER','https://vsmash.com/wp-content/uploads/2022/01/shb65z3km.png','489.90','Footwear','Item code: SHB65Z3KM \n\nColour: White Tiger \n\nUpper: Synthetic leather \n\nMidsole: Synthetic resin \n\nOutsole: Rubber sole')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX POWER CUSHION 65X2 MEN RED BLACK','https://vsmash.com/wp-content/uploads/2020/10/2-2.png','379.90','Footwear','Colour: Red Black \n\nUpper: Synthetic fiber \n\nMidsole: Synthetic resin \n\nOutsole: Rubber')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX POWER CUSHION INFINITY 2','https://vsmash.com/wp-content/uploads/2022/05/Inifinity-Blue.png','799.90','Footwear','Color(s) : Metallic blue, Metallic Red, Black \n\nUpper : Synthetic Leather \n\nMidsole : Synthetic Resin \n\nOutsole : Rubber Sole \n\nMaterial : POWER CUSHION+, POWER CUSHION, Full Carbon Fibre (Ave.270g), Double Raschel Mesh, Durable Skin, Durable Skin Light, Power Graphite Sheet, Hyper msLITE')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX 75TH SAFERUN 200','https://vsmash.com/wp-content/uploads/2022/05/Saferun-200-Women.png','749.90','Footwear','Upper: Synthetic fiber \n\nMidsole: POWER CUSHION™+, POWER CUSHION™, Synthetic resin \n\nOutsole: Rubber \n\nColours: White')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX POWER CUSHION ECLIPSION Z2 MENS','https://vsmash.com/wp-content/uploads/2021/06/SHBELZ2MEX_01.png','539.90','Footwear','Color: Black Red \n\nupper: Synthetic fibers \n\nMid sole: Synthetic resin \n\nOutsole: Rubber bottom \n\nFeatures: Radical Blade Sole, Semi-one piece sole, Power Cushion +, Power Cushion, Toe Assist Shape, Round Sole, Inner Bootie, Power Graphite, Feather Bounce Foam, Synchro-fit Insole, Durable Skin Light')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX MEN’S WARM UP JACKET 51043EX','https://vsmash.com/wp-content/uploads/2021/10/35.png','449.90','Appareal','Color :Ruby Red, White \n\nMaterial : 88% Polyester, 12% Polyurethane \n\nTechnology: UV reduction, Anti-static, Sweat Absorbent and quick dry, Stretch')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX WARM-UP PANTS 80076EX','https://vsmash.com/wp-content/uploads/2022/01/34.png','389.90','Appareal','Color: Denim Navy, Black, Deep Green, Bordeaux \n\nMaterial: Body: 90% nylon, 10% polyurethane / Lining: 100% polyester \n\nFeature: UV reduction, Sweat-absorbent and quick drying, Stretch, Anti-Static, Water repellent')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX MEN’S CREW NECK SHIRT 10440EX','https://vsmash.com/wp-content/uploads/2022/02/z-10440_019-1.jpg','329.90','Appareal','Color: Navy Blue, White \n\nMaterial: 100% polyester \n\nFunction:  Very Cool Dry, UV Reduction, Air Release,  Antistatic, Quick Dry & Sweat Absorbent')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX MEN’S POLO SHIRT 10482EX','https://vsmash.com/wp-content/uploads/2021/10/30.png','315.90','Appareal','Color : White, Ruby Red \n\nMaterial: Main: 100% Polyester, Other: 88% Polyester, 12% Polyurethane \n\nTechnology: VERYCOOL, UV Reduction, Anti-static, Sweat-absorbent& quick dry, Stretch, Precision Move')
''')

cursor.execute('''
    INSERT INTO products(name,image,price,category,description) 
    VALUES('YONEX MEN’S CREW NECK SHIRT 10442EX','https://vsmash.com/wp-content/uploads/2022/02/z-10442_500-1.jpg','309.90','Appareal','Color: American Blue, Tornado Red, White, Lime Yellow \n\nMaterial: 100% polyester \n\nFunction:  Very Cool Dry, UV Reduction, Air Release,  Antistatic, Quick Dry & Sweat Absorbent')
''')

db.commit()
db.close()