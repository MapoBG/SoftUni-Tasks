const catTemplate = (catInfo) => `
<li>
<img src=${catInfo.imageUrl} alt="Black Cat">
<h3>${catInfo.name}</h3>
<p><span>Breed: </span>${catInfo.breed}</p>
<p><span>Description: </span>${catInfo.description}</p>
<ul class="buttons">
    <li class="btn edit"><a href="">Change Info</a></li>
    <li class="btn delete"><a href="">New Home</a></li>
</ul>
</li>
`;

module.exports = catTemplate;