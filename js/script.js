let balance = 60000;
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
function toggleBtnAct(activeId, inactiveId) {
    document.getElementById(activeId).classList.remove('border-gray-500');
    document.getElementById(activeId).classList.add('bg-lime', 'text-text-primary', 'border-lime');
    document.getElementById(inactiveId).classList.remove('bg-lime', 'text-text-primary', 'border-lime');
    document.getElementById(inactiveId).classList.add('border', 'border-gray-500', 'text-black');
}
// donation activities
function donation(cardID){
    const donationIn = document.getElementById(`donationIn${cardID}`);
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
    const currDonationAmt = document.getElementById(`donation${cardID}`);
    const newDonationAmt = parseFloat(currDonationAmt.textContent) + donationAmt;
    currDonationAmt.textContent= newDonationAmt;

    addToAmtHistory(donationAmt, cardID);
    donationIn.value= '';
    donationModal.showModal();
}