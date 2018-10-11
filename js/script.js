document.addEventListener('DOMContentLoaded', function() {
	let overlay = document.querySelector('.overlay'),
		popup = document.querySelector('.popup'),
		popup_btn = document.querySelector('.popup-btn'),
		custom = document.querySelector('.custom'),
		custom_info = document.querySelector('.custom-info'),
		custom_char = document.querySelector('.custom-char'),
		custom_style = document.querySelector('.custom-style'),
		main = document.querySelector('.main');

	popup_btn.addEventListener('click', function() {
		overlay.style.display = 'none';
		popup.style.display = 'none';
		custom.style.display = 'flex';
		custom_info.style.display = 'block';
		custom_char.style.display = 'block';
		custom_style.style.display = 'block';
		main.style.display = 'none';
	});






	changeMan();
	function changeMan() {
		let person_skin = document.getElementById('person-skin'),
			person_clothes = document.getElementById('person-clothes'),
			person_hair = document.getElementById('person-hair'),
			skin_color = document.querySelectorAll('.skin-color'),
			skin = document.querySelector('.skin'),
			skin_prev = skin.querySelector('.prev'),
			skin_next = skin.querySelector('.next'),
			hair = document.querySelector('.hair'),
			hair_style = document.querySelectorAll('.hair-style'),
			hair_prev = hair.querySelector(".prev"),
			hair_next = hair.querySelector('.next'),
			clothes = document.querySelector('.clothes'),
			clothes_style = document.querySelectorAll('.clothes-style'),
			clothes_prev = clothes.querySelector('.prev'),
			clothes_next = clothes.querySelector('.next'),
			radio = document.getElementsByName('sex'),
			inputName = document.getElementById('name'),
			inputAge = document.getElementById('age'),
			selectViews = document.getElementById('select'),
			inputBio = document.getElementById('bio'),
			btnReady = document.getElementById('ready'),
			main_cards = document.querySelector('.main-cards'),
			main_cards_item = document.querySelectorAll('.main-cards-item'),
			reset_btn = document.getElementById('reset'),
			voting_btn = document.getElementById('voting'),
			crime_btn = document.getElementById('crime'),
			result_count,
			progress_bar,
			item = 0,
			hair_item = 0,
			clothes_item = 0,
			sex = 1,


			form = {
				name: '',
				age: '',
				sex: '',
				views: '',
				bio: '',
				hair: '',
				skin: '',
				clothes: ''
			};

		function changeSex() {
			for (let i = 0; i < radio.length; i++) {
				radio[i].addEventListener('change', function() {
					if (radio[i].checked) {
						if (radio[i].value == 'Мужской') {
							sex = 1;
							changeSkin(item);
							changeClothes(clothes_item + sex);
							hair_item = 0;
							changeHair(hair_item + sex);
						} else if (radio[i].value == 'Женский') {
							sex = 4;
							changeSkin(item);
							changeClothes(clothes_item + sex);
							changeHair(hair_item + sex);
						} 
					}
				});
			}	
		}

		changeSex();

		function changeSkin(n) {
			person_skin.style.backgroundImage = `url(./img/skin/skin-${n+sex}.png)`;
		}
		function changeClothes(n) {
			person_clothes.style.backgroundImage = `url(./img/clothes/construct/clothes-${n}.png)`;

			for (let i = 0; i < clothes_style.length; i++) {
				clothes_style[i].style.display = 'none';
			}

			clothes_style[n-1].style.display = 'block';
		}
		function changeHair(n) {
			person_hair.style.backgroundImage = `url(./img/hair/construct/hair-${n}.png)`;
			
			for (let i = 0; i < hair_style.length; i++) {
				hair_style[i].style.display = 'none';
			}

			hair_style[n-1].style.display = 'block';
		}

		function changeItem(n) {
			for (let i = 0; i < skin_color.length; i++) {
				skin_color[i].style.display = 'none';
			}

			skin_color[n].style.display = 'block';

			changeSkin(n);
		}


		skin_prev.addEventListener('click', function() {
			if (item == 0) {
				item = 3;
			}
			item += -1;
			changeItem(item);
		});
		skin_next.addEventListener('click', function() {
			if (item == 2) {
				item = -1;
			}
			item += 1;
			changeItem(item);
		});




		hair_prev.addEventListener('click', function() {

			if (hair_item == 0) {
				hair_item = 3;
			}
			hair_item += -1;
			changeHair(hair_item+sex);
		});
		hair_next.addEventListener('click', function() {

			if (hair_item == 2) {
				hair_item = -1;
			}
			hair_item += 1;
			changeHair(hair_item+sex);
		});



		clothes_prev.addEventListener('click', function() {

			if (clothes_item == 0) {
				clothes_item = 3;
			}
			clothes_item += -1;
			changeClothes(clothes_item+sex);
		});
		clothes_next.addEventListener('click', function() {

			if (clothes_item == 2) {
				clothes_item = -1;
			}
			clothes_item += 1;
			changeClothes(clothes_item+sex);
		});




		reqForm();
		function reqForm() {
			btnReady.addEventListener('click', function() {
				let x = 0;
				for (let i = 0; i < radio.length; i++) {
					if (radio[i].checked) {
						x = radio[i].value;
						break;
					}
				}
				form = {
					name: inputName.value,
					age: inputAge.value,
					sex: x,
					views: select.value,
					bio: inputBio.value,
					hair: getComputedStyle(person_hair).backgroundImage,
					skin: getComputedStyle(person_skin).backgroundImage,
					clothes: getComputedStyle(person_clothes).backgroundImage
				};

				setCandidate();

				main.style.display = '';
				custom.style.display = '';
				result_count = document.querySelectorAll('.result-count');
				progress_bar = document.querySelectorAll('.progress-bar');
				result_count[2].textContent = 0;
				progress_bar[2].style.height = '0';



				voting_btn.addEventListener('click', function() {
					percent(100, -60, 0);
				});

				crime_btn.addEventListener('click', function() {
					percent(100, 0, 25);
				});
	
			});
		}

		function setCandidate() {
			let copy_cards_item = main_cards_item[0].cloneNode(true);

			copy_cards_item.className = 'main-cards-item my-candidate';
			main_cards.appendChild(copy_cards_item);

			let photo = copy_cards_item.querySelector('.photo'),
				cand_name = copy_cards_item.querySelector('.name'),
				cand_age = copy_cards_item.querySelector('.age'),
				cand_sex = copy_cards_item.querySelector('.sex'),
				cand_views = copy_cards_item.querySelector('.views'),
				cand_bio = copy_cards_item.querySelector('.bio');

			main_cards_item = document.querySelectorAll('.main-cards-item');

			photo.style.backgroundImage = `${form.hair}, ${form.clothes}, url(./img/clothes/construct/shoes.png), ${form.skin}`;
			photo.style.backgroundSize = 'cover';

			cand_name.textContent = form.name;
			cand_age.textContent = form.age;
			cand_sex.textContent = form.sex;
			cand_views.textContent = form.views;
			cand_bio.textContent = form.bio;
		}


		function percent(max, f, c) {
			let x = Math.floor(Math.random() * (max + f + 1)) + c;
			
			if (x > max) {x = 100};

			let y = Math.floor(Math.random() * ((max - x) + 1)),
				z = max - (x + y);

			result_count[0].textContent = z;
			result_count[1].textContent = y;
			result_count[2].textContent = x;

			progress_bar[0].style.height = z + '%';
			progress_bar[1].style.height = y + '%';
			progress_bar[2].style.height = x + '%';
		}

		reset_btn.addEventListener('click', function() {

			let my_candidate = document.querySelector('.my-candidate');

			main_cards.removeChild(my_candidate);

			main.style.display = 'none';
			custom.style.display = 'flex';

			result_count[0].textContent = 35;
			result_count[1].textContent = 65;
			result_count[2].textContent = 0;

			progress_bar[0].style.height = 35 + '%';
			progress_bar[1].style.height = 65 + '%';
			progress_bar[2].style.height = 0 + '%';

		});

	}

});