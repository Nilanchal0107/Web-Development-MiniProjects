import { playlistArr } from '/playlist.js'

let playlistHtml = []
playlistArr.forEach(function(track){
    
    
    playlistHtml.push(`
    <section class="card">
        <div class="card-start">
            <img src="/images/${track.albumArt}">
        </div>
            <div class="card-mid">
                <h4 class="card-title">${track.title}</h4>
                <p class="card-artist">${track.artist}</p>
            </div>
        <div class="card-end">
            <p class="card-menu">...</p>
        </div>
    </section>
    `)
})

document.getElementById('container').innerHTML = playlistHtml.join('')
