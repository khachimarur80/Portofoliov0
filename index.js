function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  return (
    rect.top >= -rect.height/2 &&
    rect.bottom <= windowHeight + rect.height/4
  );
}

function handleScroll() {
	var button = document.getElementById("back-to-top-btn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }

	const frames = document.querySelectorAll('.frame');

	frames.forEach((frame, index) => {
		if (isInViewport(frame)) {
			frame.classList.add('animate-in');
			frame.classList.remove('animate-out');
		} else  {
			frame.classList.remove('animate-in');
			frame.classList.add('animate-out');
		}
	});
}


window.addEventListener('scroll', handleScroll);

window.addEventListener('load', ()=>{
	let num = 1;
	let wait = 100;
	for (let i=0; i<3; i++) {
		setTimeout(()=>{
			let mainDiv = document.getElementById('main')

			let newContainer = document.createElement('div')
			newContainer.classList.add('drop-container-'+num)
			setTimeout(()=>{
				//newContainer.querySelector('.drop').remove()
			},1500)

			let newDrop = document.createElement('div')
			newDrop.classList.add('drop')

			let newWave = document.createElement('div')
			newWave.classList.add('wave')


			//newContainer.appendChild(newDrop)
			newContainer.appendChild(newWave)

			mainDiv.appendChild(newContainer)

			let newContainerOutline = document.createElement('div')
			newContainerOutline.classList.add('drop-container-outline-'+num)
			setTimeout(()=>{
				newContainerOutline.remove()
			},4000)

			let newDropOutline = document.createElement('div')
			newDropOutline.classList.add('drop-outline')

			let newWaveOutline = document.createElement('div')
			newWaveOutline.classList.add('wave-outline')

			//newContainerOutline.appendChild(newDropOutline)
			newContainerOutline.appendChild(newWaveOutline)

			mainDiv.appendChild(newContainerOutline)

			num +=1
			if (num>3) {
				num = 1
			}
			wait -= 200
		}, i*wait)
		setTimeout(()=>{
			document.getElementById('main').style.background="#42b883";
		},5000)
	}
	setTimeout(()=>{
		handleScroll()
	}, 500)
})


function submitForm (event) {
	event.preventDefault();
	emailjs.init('Ifjg_oR_H0mMlRnTI')
	const formData = new FormData(event.target);

	emailjs.sendForm("service_p4b392o", "template_wokpaeh", 'contact-form')
	.then(function (response) {
		console.log("Email sent successfully!", response);
		event.target.reset();
		document.getElementById('send').classList.remove('btn-secondary')
		document.getElementById('send').classList.add('btn-primary')
		document.getElementById('send').innerText = 'Sended!'

		setTimeout(()=>{
			document.getElementById('send').classList.add('btn-secondary')
			document.getElementById('send').classList.remove('btn-primary')
			document.getElementById('send').innerText = 'Send'
		}, 3000)
	})
	.catch(function (error) {
		console.error("Email sending failed:", error);
	});
}
function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

document.getElementById('contact-form').addEventListener('submit', submitForm) 