const {calc, asyncDemo} = require('./simple')

test('should calc', ()=>{
    const total = calc(10, 0.3)
    expect(total).toBe(13)
})

test('async demo', async()=>{
    // asyncDemo().then((value)=>{
    //     expect(5).toBe(5)
    //     done
    // })
    const demo = await asyncDemo()
    expect(demo).toBe(5)
    //  setTimeout(()=>{
    //     expect(1).toBe(2)
    //     done()
    // },1000)
})