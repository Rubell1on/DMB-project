const scene = new Fields()
    .SetData()
    .ShowAll();
    
setInterval(() => {
    scene.SetData();
}, 1000);