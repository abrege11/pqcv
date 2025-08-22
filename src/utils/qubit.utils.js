import { Complex } from "../interactive-blochsphere/Complex";


export const polarCoordinatesHelper = (alphaObj, betaObj) => {
    const alphaComplex = new Complex(alphaObj?.real, alphaObj?.imag)
    const betaComplex = new Complex(betaObj?.real, betaObj?.imag)

    const mag = Math.sqrt(alphaComplex.magnitude() * alphaComplex.magnitude() + betaComplex.magnitude() * betaComplex.magnitude());
    const alpha = alphaComplex.divideByReal(mag)
    const beta = betaComplex.divideByReal(mag)

    const theta = 2 * Math.acos(alpha.magnitude());

    const absAlphaAbsBeta = alpha.multiply(beta).magnitude();
    let phi = 0;
    if (absAlphaAbsBeta !== 0) {
        const conjAlpha = alpha.conjugate();
        const betaAlphaConjugate = beta.multiply(conjAlpha);
        phi = betaAlphaConjugate.divideByReal(absAlphaAbsBeta).argument()
    }
    return { theta, phi };
}