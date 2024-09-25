let balance = 30000;
document.getElementById('balanceAvl').textContent = balance;
document.getElementById('donation-btn').addEventListener('click', () => {
    document.getElementById('donation-container').classList.remove('hidden');
    document.getElementById('history-container').classList.add('hidden');
    toggleBtnAct('donation-btn', 'history-Btn');
});
document.getElementById('history-Btn').addEventListener('click', () => {
    document.getElementById('donation-container').classList.add('hidden');
    document.getElementById('history-container').classList.remove('hidden');
    toggleBtnAct('history-Btn', 'donation-btn');
});
// togglebar
function selectOption(selectedOption) {
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
      if (index === selectedOption - 1) {
        option.classList.add('bg-lime', 'text-text-primary', 'border-lime');
        option.classList.remove('border', 'border-gray-500');
      } else {
        option.classList.add('border', 'border-gray-500');
        option.classList.remove('bg-lime', 'text-text-primary', 'border-lime');
      }
    });
  }
// function toggleBtnAct(activeId, inactiveId) {
//     document.getElementById(activeId).classList.remove('border', 'border-gray-500');
//     document.getElementById(activeId).classList.add('bg-lime', 'text-text-primary', 'border-lime');
//     document.getElementById(inactiveId).classList.remove('bg-lime', 'text-text-primary', 'border-lime');
//     document.getElementById(inactiveId).classList.add('border', 'border-gray-500');
// }
function addToAmtHistory(donationAmt, cardId) {
    const historyLt = document.getElementById('historyLt');
    const timestamp = new Date().toString();
    let message;

//donation msg as per card id
    if (cardId === 1) {
        message = 'Flood Relief in Noakhali, Bangladesh';
    } else if (cardId === 2) {
        message = 'Flood Relief in Feni, Bangladesh';
    } else if (cardId === 3) {
        message = 'Aid for Injured in the Quota Movement, Bangladesh';
    }

    // transaction card
    const transactionCard = `
        <div class="p-4 md:p-8 border-gray-300 border rounded-xl mt-4 md:mt-8">
            <div class="space-y-3">
                <h2 class="text-text-primary font-bold text-xl">
                    <span>${donationAmt}</span> Taka is Donated for <span>${message}</span>
                </h2>
                <p class="text-text-gray">Date: <span>${timestamp}</span></p>
            </div>
        </div>
    `;

    // insertion of the transaction card as HTML into the history section
    historyLt.insertAdjacentHTML('beforeend', transactionCard);
}

// donation activities
function donation(cardId){
    const donationIn = document.getElementById(`donationIn${cardId}`);
    const donationAmt = parseFloat(donationIn.value);

    if(isNaN(donationAmt) || donationAmt <= 0){
        alert('Please enter a valid amount for donation!');
        return;
    }

    if(donationAmt > balance){
        alert('Sorry! Insufficient balance. Try to donate an amount within your balance.');
        return;
    }
    
    // donated amount deduction
    balance -= donationAmt ;
    document.getElementById('balanceAvl').textContent=balance;

    // updation of donation
    const currDonationAmt = document.getElementById(`donation${cardId}`);
    const newDonationAmt = parseFloat(currDonationAmt.textContent) + donationAmt;
    currDonationAmt.textContent= newDonationAmt;

    addToAmtHistory(donationAmt, cardId);
    donationIn.value= '';
    donationModal.showModal();
}
