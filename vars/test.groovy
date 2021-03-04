
import com.cloudbees.groovy.cps.NonCPS



@NonCPS
		def call(){
		startedByTimer = false
		def buildCauses = currentBuild.rawBuild.getCauses()
		def causeDescription
		for ( buildCause in buildCauses ) {
			if (buildCause != null) {
				causeDescription = buildCause.getShortDescription()
				if (causeDescription.contains("Started by timer")) {
					startedByTimer = true
				}
			}
		}
		return causeDescription
	}
